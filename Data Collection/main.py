import asyncio
import json
from html.parser import HTMLParser
from itertools import chain, filterfalse
from os import mkdir
from os.path import exists
from typing import Any, Callable, List, Optional

import httpx
import regex
import wikitextparser
from PIL import Image


def chunks(lst, n):
    '''Yield successive n-sized chunks from lst.'''
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


def parse_dict_text(text: str) -> Optional[dict]:
    split_text = text.split(' ')
    return {key: float(value) for key, value in chunks(split_text, 2)} if len(split_text) % 2 == 0 else None


class TagRemovalParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.output = ''

    def handle_data(self, data):
        self.output += data


tag_removal_regex = regex.compile(r'<.+?>', regex.V1)


async def get_raw_text(wikitext: str, client: httpx.AsyncClient) -> str:
    response = await client.get('', params={
        'action': 'parse',
        'text': wikitext,
        'prop': 'text'
    })
    parser = TagRemovalParser()
    parser.feed(response.json()['parse']['text'])
    return tag_removal_regex.sub('', parser.output.strip())


list_split_regex = regex.compile(
    r'(?<=}}) ?(?=\[\[)|(?:(?<=]]|}}) ?| )(?=\{\{name)| (?:•|&bull;) |(?<!^)(?<!>)<[^\[\]\{\}]+>(?!<)(?!$)|\n', regex.V1)


async def parse_list(wikitext: str, client: httpx.AsyncClient) -> List[str]:
    '''
    Parses lists of sources, locations etc. from the wiki in all the typical ways they are formatted.
    '''
    items = list_split_regex.split(wikitext.strip())

    return await asyncio.gather(*(get_raw_text(item, client) for item in items))


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
    items = {key: value.split('/')
             for key, value in json.load(file)['content'].items()}
    for item, chance in items.items():
        ids[chance[0]] = item
    for item, chance in title_special_cases.items():
        ids[chance] = item


with open('CookingChannel.json') as file:
    cookingEpisodes = {value.split('/')[0]: int(key)
                       for key, value in json.load(file)['content'].items()}

with open('CraftingRecipes.json') as file:
    craftingRecipes = {key: value.split(
        '/') for key, value in json.load(file)['content'].items()}

# Cases where the name of the recipe differs from the name of the resulting item
recipe_special_cases = {
    '197': 'Cheese Cauli.',
    '200': 'Vegetable Stew',
    '223': 'Cookies',
    '231': 'Eggplant Parm.',
    '238': 'Cran. Sauce',
    '242': 'Dish o\' The Sea',
    '254': 'Triple Shot Espresso'
}

with open('CookingRecipes.json') as file:
    recipes = {key: value.split('/')
               for key, value in json.load(file)['content'].items()}

with open('Fish.json') as file:
    fish = {key: value.split('/')
            for key, value in json.load(file)['content'].items()}

with open('Monsters.json') as file:
    monster_drops = {}
    for monster, chance in json.load(file)['content'].items():
        drops = parse_dict_text(chance.split('/')[6])
        for item, chance in drops.items():
            if item in monster_drops:
                monster_drops[item][monster] = chance
            else:
                monster_drops[item] = {monster: chance}


# Cases where the name of an item does not match the name of its image
image_special_cases = {
    '261': 'Warp Totem Desert',
    '688': 'Warp Totem Farm',
    '689': 'Warp Totem Mountains',
    '690': 'Warp Totem Beach'
}


async def get_item_info(item_id: str, client: httpx.AsyncClient) -> dict:
    row: List[str] = items[item_id]

    item = {
        'id': item_id,
        'name': row[0],
        'category': row[3],
        'description': row[5]
    }

    item['category'] = row[3]

    if item['category'] == 'Arch':
        item['artifactSpots'] = parse_dict_text(row[6])
    elif item['category'] == 'Cooking -7':
        recipe_name = recipe_special_cases[item_id] if item_id in recipe_special_cases else item['name']
        if recipe_name in recipes:
            recipe = recipes[recipe_name]
            item['ingredients'] = parse_dict_text(recipe[0])

            source = recipe[3].split(' ')
            item['recipeSources'] = []
            if source[0] == 'l':
                item['recipeSources'].append({
                    'type': 'level',
                    'level': int(source[1])
                })
            elif source[0] == 'f':
                item['recipeSources'].append({
                    'type': 'friendship',
                    'villager': source[1],
                    'level': int(source[2])
                })
            elif source[0] == 's':
                item['recipeSources'].append({
                    'type': 'skill',
                    'skill': source[1],
                    'level': int(source[2])
                })

            if item['name'] in cookingEpisodes:
                item['recipeSources'].append({
                    'type': 'tv',
                    'episode': cookingEpisodes[item['name']]
                })
    elif item['category'] == 'Fish -4':
        if fish[item_id][1] != 'trap':
            item['time'] = fish[item_id][5].split(' ')

            item['weather'] = fish[item_id][7]
        else:
            item['water'] = fish[item_id][4]

    if item['name'] in craftingRecipes:
        item['ingredients'] = parse_dict_text(craftingRecipes[item['name']][0])

    if item_id in monster_drops:
        item['monsterDrops'] = monster_drops[item_id]

    title = title_special_cases[item_id] if item_id in title_special_cases else item['name']
    response: httpx.Response = await client.get('', params={
        'action': 'query',
        'prop': 'revisions',
        'titles': title,
        'redirects': 'true',
        'rvprop': 'content'
    })
    page = response.json()['query']['pages'][0]

    if 'missing' not in page:
        title = page['title']
        item['url'] = f'https://stardewvalleywiki.com/{title}'

        wikitext = wikitextparser.parse(page['revisions'][0]['content'])
        infoboxes = [
            template for template in wikitext.templates if 'Infobox' in template.name]
        if len(infoboxes) > 0:
            infobox = infoboxes[0]
            if infobox.has_arg('source'):
                item['sources'] = [source for source in await parse_list(infobox.get_arg('source').value, client) if source != 'Artisan Goods' and not ('monsterDrops' in item and any([monster in source for monster in item['monsterDrops'].keys()]))]
            elif infobox.has_arg('os'):
                item['sources'] = [source for source in await parse_list(infobox.get_arg('os').value, client) if source != 'Artisan Goods' and not ('monsterDrops' in item and any([monster in source for monster in item['monsterDrops'].keys()]))]
            if 'sources' in item and item['sources'] == []:
                item.pop('sources')

            if infobox.has_arg('craftingstation'):
                crafting_station = await get_raw_text(infobox.get_arg('craftingstation').value, client)
                if 'sources' in item:
                    if crafting_station not in item['sources']:
                        item['sources'].append(crafting_station)
                else:
                    item['sources'] = [crafting_station]

            if infobox.has_arg('location'):
                item['locations'] = await parse_list(infobox.get_arg('location').value, client)

            if infobox.has_arg('season'):
                seasons = infobox.get_arg('season').value.strip().lower()
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
                        'winter': True
                    }

    return item


use_title = ['Honey (any)', 'Wine (any)', 'Juice (any)',
             'Roe (any)', 'Strange Doll']


class ItemTableParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.output = []
        self.in_table = False
        self.index = -1

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if 'class' in attr_dict and attr_dict['class'] == 'wikitable':
            self.in_table = True
            self.index += 1
            self.output.append([])
        elif tag == 'a' and 'title' in attr_dict:
            self.last_title = attr_dict['title']

    def handle_endtag(self, tag):
        if tag == 'table':
            self.in_table = False

    def handle_data(self, data):
        if self.in_table and data.strip() != '':
            name = self.last_title if data in use_title else data
            self.output[self.index].append(ids[name])


with open('Bundles.json') as file:
    bundles = []
    for key, value in json.load(file)['content'].items():
        split = value.split('/')
        bundles.append({
            'name': split[0] + ' Bundle',
            'section': key.split('/')[0],
            'slots': int(split[4]) if len(split) >= 5 else len(split[2].split(' ')) // 3,
            'items': [
                {
                    'id': object_id,
                    'amount': int(count),
                    'quality': int(quality)
                } for object_id, count, quality in chunks(split[2].split(' '), 3)
            ]
        })


with open('NPCDispositions.json') as file:
    npc_dispositions = [value.split('/')
                        for value in json.load(file)['content'].values()]

with open('NPCGiftTastes.json') as file:
    content = json.load(file)['content']
    universal_loves = content['Universal_Love'].split(' ')
    universal_likes = content['Universal_Like'].split(' ')
    universal_neutral = content['Universal_Neutral'].split(' ')
    universal_dislikes = content['Universal_Dislike'].split(' ')
    universal_hates = content['Universal_Hate'].split(' ')
    npc_gift_tastes = [value.split('/')
                       for value in list(content.values())[5:]]


def get_villager_info(disposition, gift_taste):
    villager = {
        'name': disposition[11],
        'birthday': disposition[8],
        'loves': gift_taste[1].split(' '),
        'likes': gift_taste[3].split(' '),
        'dislikes': gift_taste[5].split(' '),
        'hates': gift_taste[7].split(' '),
        'neutral': gift_taste[9].split(' ')
    }

    custom_preferences = villager['loves'] + villager['likes'] + \
        villager['dislikes'] + villager['hates'] + villager['neutral']
    villager['loves'] += [item for item in universal_loves if item not in custom_preferences]
    villager['likes'] += [item for item in universal_likes if item not in custom_preferences]
    villager['neutral'] += [item for item in universal_neutral if item not in custom_preferences]
    villager['dislikes'] += [item for item in universal_dislikes if item not in custom_preferences]
    villager['hates'] += [item for item in universal_hates if item not in custom_preferences]

    return villager


villagers = [get_villager_info(disposition, gift_taste)
             for disposition, gift_taste in zip(npc_dispositions, npc_gift_tastes)]


spritesheet: Image.Image = Image.open('springobjects.png')


def get_sprite(item_id: int):
    x = item_id % 24 * 16
    y = item_id // 24 * 16
    return spritesheet.crop((x, y, x + 16, y + 16))


async def main():
    async with httpx.AsyncClient(base_url='https://stardewvalleywiki.com/mediawiki/api.php', params={'format': 'json', 'formatversion': 2}, timeout=20) as client:
        response: httpx.Response = await client.get('', params={
            'action': 'parse',
            'page': 'Collections',
            'prop': 'text'
        })
        parser = ItemTableParser()
        parser.feed(response.json()['parse']['text'])

        items_shipped = parser.output[0] + parser.output[1]
        fish = parser.output[2]
        artifacts = parser.output[3]
        minerals = parser.output[4]
        cooking = parser.output[5]

        crafting = [recipe[2].split(' ')[0] for recipe in craftingRecipes.values()
                    if recipe[2].split(' ')[0] in items]

        output = {
            'shipping': items_shipped,
            'fish': fish,
            'artifacts': artifacts,
            'minerals': minerals,
            'cooking': cooking,
            'crafting': crafting,
            'bundles': bundles,
            'friendship': villagers,
            'items': {item['id']: item for item in await asyncio.gather(*(get_item_info(item_id, client) for item_id in items.keys()))}
        }

        if not exists('./sprites'):
            mkdir('./sprites')
        for item in items.keys():
            get_sprite(int(item)).save(f'./sprites/{item}.png')

        with open('output.json', 'w') as file:
            json.dump(output, file)

if __name__ == '__main__':
    asyncio.run(main())
