import asyncio
import json
import re
from base64 import b64encode
from html.parser import HTMLParser
from io import BytesIO
from os.path import exists
from typing import Dict, Generator, List, Optional, Tuple, TypeVar, cast

import httpx
import wikitextparser
from PIL import Image

from typings import Bundle, BundleItem, Recipe, Villager, MediaWikiResponse, Item

T = TypeVar('T')


def chunks(lst: List[T], n: int) -> Generator[List[T], None, None]:
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


def parse_dict_text(text: str) -> Dict[str, float]:
    """Convert string structured as 'key value key value...' to dict"""
    if len(text) == 0:
        return {}
    split_text = text.split(' ')
    assert len(split_text) % 2 == 0, f'\'{text}\' is invalid dict text'
    return {key: float(value) for key, value in chunks(split_text, 2)}


class TagRemovalParser(HTMLParser):
    output: str

    def __init__(self):
        super().__init__()
        self.output = ''

    def handle_startendtag(self, tag: str, attrs: List[Tuple[str, Optional[str]]]):
        if tag == 'br':
            self.output += ' '

    def handle_data(self, data: str):
        self.output += data

    def error(self, message: str):
        pass


tag_removal_regex = re.compile(r'<.+?>')
multiple_space_regex = re.compile(r'  +')


async def get_raw_text(wikitext: str, client: httpx.AsyncClient) -> str:
    response = await client.get('', params={
        'action': 'parse',
        'text': wikitext,
        'prop': 'text'
    })
    parser = TagRemovalParser()
    parser.feed(cast(MediaWikiResponse, response.json())['parse']['text'])
    return multiple_space_regex.sub(' ', tag_removal_regex.sub('', parser.output.strip())).replace('\n\n\n', ': ')


list_split_regex = re.compile(
    r'(?<=}}) ?(?=\[\[)|(?:(?<=]]|}}) ?|(?<=\)) )(?={{)| (?:•|&bull;) |(?<!^)(?<!>)</?[^\[\]{\}/]+(?:/>(?!\()|>)('
    r'?!<)(?!$)|\n')


async def parse_list(wikitext: str, client: httpx.AsyncClient) -> List[str]:
    """
    Parses lists of sources, locations etc. from the wiki in all the typical ways they are formatted.
    """
    items = list_split_regex.split(wikitext.strip())

    return cast(List[str], await asyncio.gather(*[get_raw_text(item, client) for item in items]))


# Cases where the name of the item differs from the name of the wiki page
title_special_cases = {
    '126': 'Strange Doll (green)',
    '127': 'Strange Doll (yellow)',
    '180': 'Brown Egg',
    '182': 'Large Brown Egg',
    '242': 'Dish o\' The Sea',
    '390': 'Stone',
    '438': 'Large Goat Milk',
}

# Cases where the name and link in Collections do not match the page title
ids = {
    'Large Egg (white)': '174',
    'Egg (white)': '176',
    'Egg (brown)': '180',
    'Large Egg (brown)': '182',
    'Pickles (any)': '342',
    'Jelly (any)': '344',
}
with open('ObjectInformation.json') as file:
    object_data: Dict[str, List[str]] = {object_id: data.split('/') for object_id, data in
                                         json.load(file)['content'].items()}

with open('BigCraftablesInformation.json') as file:
    craftable_data: Dict[str, List[str]] = {craftable_id: data.split('/') for craftable_id, data in
                                            json.load(file)['content'].items()}

for item_id, data in object_data.items():
    ids[data[0]] = item_id
for item_id, data in craftable_data.items():
    ids[data[0]] = 'c' + item_id
for item_id, data in title_special_cases.items():
    ids[data] = item_id

with open('CookingChannel.json') as file:
    cooking_episode_ids: Dict[str, int] = {data.split('/')[0]: int(episode_id) for episode_id, data in
                                           json.load(file)['content'].items()}

with open('CraftingRecipes.json') as file:
    crafting_recipe_data: Dict[str, List[str]] = {data.split('/')[2].split(' ')[0]: [recipe_name, *data.split('/')]
                                                  for recipe_name, data in json.load(file)['content'].items()}

with open('CookingRecipes.json') as file:
    cooking_recipe_data: Dict[str, List[str]] = {data.split('/')[2].split(' ')[0]: [recipe_name, *data.split('/')]
                                                 for recipe_name, data in json.load(file)['content'].items()}

with open('Fish.json') as file:
    fish_data: Dict[str, List[str]] = {fish_id: data.split('/') for fish_id, data in json.load(file)['content'].items()}

with open('Monsters.json') as file:
    monster_drops: Dict[str, Dict[str, float]] = {}
    for monster_name, data in json.load(file)['content'].items():
        drops = parse_dict_text(data.split('/')[6])
        for item_id, chance in drops.items():
            if item_id in monster_drops:
                monster_drops[item_id][monster_name] = chance
            else:
                monster_drops[item_id] = {monster_name: chance}


async def get_item_info(item_id: str, client: httpx.AsyncClient, craftable: bool = False) -> Item:
    row: List[str] = craftable_data[item_id] if craftable else object_data[item_id]

    item = cast(Item, {
        'id': 'c' + item_id if craftable else item_id,
        'isCraftable': craftable,
        'name': row[0],
        'category': row[3],
        'description': row[4 if craftable else 5]
    })

    if item['category'] == 'Arch':
        item['artifactSpots'] = parse_dict_text(row[6])
    elif item['category'] == 'Fish -4':
        if fish_data[item_id][1] != 'trap':
            item['time'] = [int(time) for time in fish_data[item_id][5].split(' ')]

            item['weather'] = fish_data[item_id][7]
        else:
            item['water'] = fish_data[item_id][4]

    if item_id in cooking_recipe_data:
        item['ingredients'] = {item_id: int(amount) for item_id, amount in
                               parse_dict_text(cooking_recipe_data[item_id][1]).items()}
    elif item_id in crafting_recipe_data and (crafting_recipe_data[item_id][4] == 'true') == craftable:
        item['ingredients'] = {item_id: int(amount) for item_id, amount in
                               parse_dict_text(crafting_recipe_data[item_id][1]).items()}

    if item_id in monster_drops and not craftable:
        item['monsterDrops'] = monster_drops[item_id]

    title = title_special_cases[item['id']] if item['id'] in title_special_cases else item['name']
    response: httpx.Response = await client.get('', params={
        'action': 'query',
        'prop': 'revisions',
        'titles': title,
        'redirects': 'true',
        'rvprop': 'content'
    })
    page = cast(MediaWikiResponse, response.json())['query']['pages'][0]

    if 'missing' not in page:
        title = page['title']
        item['url'] = f'https://stardewvalleywiki.com/{title}'

        wikitext = wikitextparser.parse(page['revisions'][0]['content'])
        infoboxes = [template for template in wikitext.templates if 'Infobox' in template.name]
        if len(infoboxes) > 0:
            infobox = infoboxes[0]
            if infobox.has_arg('source'):
                item['sources'] = [source for source in
                                   await parse_list(cast(wikitextparser.Argument, infobox.get_arg('source')).value,
                                                    client)
                                   if source != 'Artisan Goods' and not
                                   ('monsterDrops' in item and any(
                                       [monster in source for monster in item['monsterDrops'].keys()]))]
            elif infobox.has_arg('os'):
                item['sources'] = [source for source in
                                   await parse_list(cast(wikitextparser.Argument, infobox.get_arg('os')).value, client)
                                   if source != 'Artisan Goods' and not
                                   ('monsterDrops' in item and any(
                                       [monster in source for monster in item['monsterDrops'].keys()]))]
            if 'sources' in item and item['sources'] == []:
                del item['sources']

            if infobox.has_arg('craftingstation'):
                crafting_station = await get_raw_text(
                    cast(wikitextparser.Argument, infobox.get_arg('craftingstation')).value, client)
                if 'sources' in item:
                    if crafting_station not in item['sources']:
                        item['sources'].append(crafting_station)
                else:
                    item['sources'] = [crafting_station]

            if infobox.has_arg('location'):
                item['locations'] = await parse_list(cast(wikitextparser.Argument, infobox.get_arg('location')).value,
                                                     client)

            if infobox.has_arg('season'):
                seasons = cast(wikitextparser.Argument, infobox.get_arg('season')).value.strip().lower()
                item['seasons'] = {
                    'spring': 'spring' in seasons,
                    'summer': 'summer' in seasons,
                    'fall': 'fall' in seasons,
                    'winter': 'winter' in seasons
                }
                if not any(item['seasons'].values()):
                    item['seasons'] = {
                        'spring': True,
                        'summer': True,
                        'fall': True,
                        'winter': True,
                    }

            if infobox.has_arg('recipe'):
                item['recipeSources'] = [source for source in await parse_list(
                    cast(wikitextparser.Argument, infobox.get_arg('recipe')).value.replace(
                        '[[File:HeartIconLarge.png|16px|link=]]', '❤'), client
                ) if source != 'Starter']
                if not item['recipeSources']:
                    del item['recipeSources']

    return item


use_title = ['Honey (any)', 'Wine (any)', 'Juice (any)',
             'Roe (any)', 'Strange Doll']


class ItemTableParser(HTMLParser):
    output: List[List[str]] = []
    index = -1
    in_table = False
    last_title: str

    def handle_starttag(self, tag: str, attrs: List[Tuple[str, Optional[str]]]):
        attr_dict = dict(attrs)
        if 'class' in attr_dict and attr_dict['class'] == 'wikitable':
            self.in_table = True
            self.index += 1
            self.output.append([])
        elif tag == 'a' and 'title' in attr_dict:
            self.last_title = cast(str, attr_dict['title'])

    def handle_endtag(self, tag: str):
        if tag == 'table':
            self.in_table = False

    def handle_data(self, data: str):
        if self.in_table and data.strip() != '':
            name = self.last_title if data in use_title else data
            self.output[self.index].append(ids[name])

    def error(self, message: str):
        pass


with open('Bundles.json') as file:
    bundles: List[Bundle] = []
    for bundle_id, data in json.load(file)['content'].items():
        split: str = data.split('/')
        bundles.append({
            'name': split[0] + ' Bundle',
            'section': bundle_id.split('/')[0],
            'sectionId': int(bundle_id.split('/')[1]),
            'slots': int(split[4]) if len(split) >= 5 else len(split[2].split(' ')) // 3,
            'items': [
                cast(BundleItem, {
                    'id': object_id,
                    'amount': int(count),
                    'quality': int(quality)
                }) for object_id, count, quality in chunks(split[2].split(' '), 3) if object_id != '-1'
            ],
            'gold': int(split[2].split(' ')[1]) if split[2].startswith('-1') else 0
        })

with open('NPCDispositions.json') as file:
    npc_dispositions = {name: data.split('/') for name, data in json.load(file)['content'].items()}

with open('NPCGiftTastes.json') as file:
    content: Dict[str, str] = json.load(file)['content']
    universal_loves = content['Universal_Love'].split(' ')
    universal_likes = content['Universal_Like'].split(' ')
    universal_neutral = content['Universal_Neutral'].split(' ')
    universal_dislikes = content['Universal_Dislike'].split(' ')
    universal_hates = content['Universal_Hate'].split(' ')
    npc_gift_tastes = {name: data.split('/') for name, data in list(content.items())[5:]}

season_IDs = {
    'spring': 0,
    'summer': 1,
    'fall': 2,
    'winter': 3
}


def get_villager_info(disposition: List[str], gift_taste: List[str]) -> Villager:
    villager: Villager = {
        'name': disposition[11],
        'datable': disposition[5] == 'datable',
        'loves': [item for item in gift_taste[1].split(' ') if item in object_data],
        'likes': [item for item in gift_taste[3].split(' ') if item in object_data],
        'dislikes': [item for item in gift_taste[5].split(' ') if item in object_data],
        'hates': [item for item in gift_taste[7].split(' ') if item in object_data],
        'neutral': [item for item in gift_taste[9].split(' ') if item in object_data]
    }

    if len(disposition[8]) > 0:
        birthday = disposition[8].split(' ')
        villager['birthDay'] = int(birthday[1])
        villager['birthSeason'] = season_IDs[birthday[0]]

    return villager


villagers = [get_villager_info(npc_dispositions[villager], npc_gift_tastes[villager])
             for villager in npc_gift_tastes.keys()]

object_spritesheet: Image.Image = Image.open('springobjects.png')
craftable_spritesheet: Image.Image = Image.open('Craftables.png')


def get_sprite(item_id: str):
    int_id = int(item_id.lstrip('c'))

    if item_id[0] == 'c':
        x = int_id % 8 * 16
        y = int_id // 8 * 32
        return craftable_spritesheet.crop((x, y, x + 16, y + 32))
    else:
        x = int_id % 24 * 16
        y = int_id // 24 * 16
        return object_spritesheet.crop((x, y, x + 16, y + 16))


async def main():
    async with httpx.AsyncClient(base_url='https://stardewvalleywiki.com/mediawiki/api.php',
                                 params={'format': 'json', 'formatversion': 2}, timeout=60) as client:
        response: httpx.Response = await client.get('', params={
            'action': 'parse',
            'page': 'Collections',
            'prop': 'text'
        })
        parser = ItemTableParser()
        parser.feed(cast(MediaWikiResponse, response.json())['parse']['text'])

        # Getting lists from Collections page so they're in the correct order
        items_shipped = parser.output[0] + parser.output[1]
        fish = parser.output[2]
        artifacts = parser.output[3]
        minerals = parser.output[4]
        cooking = parser.output[5]

        items = {item['id']: item for item in await asyncio.gather(*(
                [get_item_info(item_id, client, False) for item_id in object_data.keys()] +
                [get_item_info(item_id, client, True)
                 for item_id in craftable_data.keys()]))}

        def get_recipe_info(row: List[str]):
            result = row[3].split(' ')
            item_id = 'c' + result[0] if row[4] == 'true' else result[0]
            recipe: Recipe = {
                'name': row[0],
                'result': item_id,
                'amount': int(result[1]) if len(result) > 1 else 1,
                'ingredients': items[item_id]['ingredients'],
            }
            if 'recipeSources' in items[item_id]:
                recipe['recipeSources'] = items[item_id]['recipeSources']

            return recipe

        recipes = {recipe['name']: recipe for recipe in
                   (get_recipe_info(row) for row in [*crafting_recipe_data.values(), *cooking_recipe_data.values()])}

        cooking = [cooking_recipe_data[item][0] for item in cooking]
        crafting = [recipe[0] for recipe in crafting_recipe_data.values()]

        output = {
            'shipping': items_shipped,
            'fish': fish,
            'artifacts': artifacts,
            'minerals': minerals,
            'cooking': cooking,
            'crafting': crafting,
            'bundles': bundles,
            'villagers': villagers,
            'items': items,
            'recipes': recipes
        }

        for item in items.keys():
            data = BytesIO()
            get_sprite(item).save(data, 'png')
            items[item]['imgData'] = 'data:image/png;base64,' + b64encode(data.getvalue()).decode()

        with open('../static/game-info.json' if exists('../static') else 'output.json', 'w') as file:
            json.dump(output, file)


if __name__ == '__main__':
    asyncio.run(main())
