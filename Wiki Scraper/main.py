import json
import re
from html.parser import HTMLParser
from itertools import chain

import wikitextparser
from pywikiapi import *

ingredient_regex = re.compile(
    r"(?:\[\[.+]] )?(.+?) \[\[(?:.+\|)?(.+?)]] \((\d+)\)")

bundle_name_regex = re.compile(r"(?<=]] ).*$")
bundle_slot_regex = re.compile(r"\[\[File:Bundle Slot\.png\|center\|link=]]")
bundle_amount_regex = re.compile(r"(?<=\()\d+(?=\))")

birth_day_regex = re.compile(r"(?<=}} )\d+")

quality_values = {
    "silver": 1,
    "gold": 2,
    "iridium": 3
}


def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


def get_item_info(page: dict):
    title = page["title"]
    if title not in items:
        wikitext = wikitextparser.parse(page["revisions"][0]["content"])
        infoboxes = list(
            filter(lambda template: "Infobox" in template.string, wikitext.templates))
        if len(infoboxes) > 0:
            infobox = infoboxes[0]

            item = {
                "name": infobox.get_arg("name").value.strip() if infobox.has_arg("name") else title,
                "id": title,
                "url": f"https://stardewvalleywiki.com/{title.replace(' ', '_')}"
            }

            if infobox.has_arg("season"):
                if len(infobox.get_arg("season").templates) > 0:
                    seasons = list(map(
                        lambda template: template.arguments[0].value.lower(), infobox.get_arg("season").templates))
                    item["seasons"] = {
                        "spring": "spring" in seasons,
                        "summer": "summer" in seasons,
                        "fall": "fall" in seasons,
                        "winter": "winter" in seasons
                    }
                elif len(infobox.get_arg("season").wikilinks) > 0:
                    seasons = list(map(lambda link: (link.title if link.text is None else link.text).strip(
                    ).lower(), infobox.get_arg("season").wikilinks))
                    item["seasons"] = {
                        "spring": "spring" in seasons,
                        "summer": "summer" in seasons,
                        "fall": "fall" in seasons,
                        "winter": "winter" in seasons
                    }
                else:
                    item["seasons"] = {
                        "spring": True,
                        "summer": True,
                        "fall": True,
                        "winter": True
                    }
            if infobox.has_arg("location"):
                location = infobox.get_arg("location")
                item["locations"] = list(map(lambda link: (link.title if link.text is None else link.text).strip(), location.wikilinks)) if len(
                    location.wikilinks) > 0 else [location.value.strip()]
            if infobox.has_arg("time"):
                item["time"] = "-".join(infobox.get_arg("time").value.strip().split(' ')[
                                        0:3:2]) if infobox.has_arg("time") else "Any"
            if infobox.has_arg("weather"):
                weather = infobox.get_arg("weather")
                if len(weather.templates) > 0:
                    weathers = list(
                        map(lambda template: template.arguments[0].value.lower(), weather.templates))
                else:
                    weathers = list(
                        map(lambda x: x.lower(), weather.value.strip().split(" • ")))
                if "any" in weathers:
                    item["weather"] = {
                        "sun": True,
                        "rain": True
                    }
                else:
                    item["weather"] = {
                        "sun": "sun" in weathers or "wind" in weathers or "springwind" in weathers or "fallwind" in weathers or "snow" in weathers,
                        "rain": "rain" in weathers or "storm" in weathers
                    }
            if infobox.has_arg("source"):
                sources = infobox.get_arg("source")
                if len(sources.wikilinks) > 0:
                    item["sources"] = list(map(lambda link: (
                        link.title if link.text is None else link.text).strip(), filter(lambda x: "Artisan Goods" not in x, sources.wikilinks)))
                elif len(sources.templates) > 0:
                    item["sources"] = [template.arguments[0].value.strip(
                    ) for template in sources.templates if template.name == "name" and "Artisan Goods" not in template.arguments[0].value]
                else:
                    item["sources"] = sources.value.strip()
            if infobox.has_arg("craftingstation"):
                crafting_station = infobox.get_arg(
                    "craftingstation").templates[0].arguments[0].value.strip()
                if "sources" in item:
                    if crafting_station not in item["sources"]:
                        item["sources"].append(crafting_station)
                else:
                    item["sources"] = [crafting_station]
            if infobox.has_arg("as"):
                if "sources" in item:
                    item["sources"] += list(map(
                        lambda link: link.title if link.text is None else link.text, infobox.get_arg("as").wikilinks))
                else:
                    item["sources"] = list(map(
                        lambda link: link.title if link.text is None else link.text, infobox.get_arg("as").wikilinks))
            if infobox.has_arg("md"):
                if "sources" in item:
                    item["sources"] += [template.arguments[0].value.strip()
                                        for template in infobox.get_arg("md").templates if template.name == "name"]
                else:
                    item["sources"] = [template.arguments[0].value.strip(
                    ) for template in infobox.get_arg("md").templates if template.name == "name"]
            if infobox.has_arg("os"):
                if "sources" in item:
                    item["sources"] += [template.arguments[0].value.strip()
                                        for template in infobox.get_arg("os").templates if template.name == "name"]
                else:
                    item["sources"] = [template.arguments[0].value.strip(
                    ) for template in infobox.get_arg("os").templates if template.name == "name"]
            if infobox.has_arg("ingredients"):
                ingredients = infobox.get_arg("ingredients")
                item["ingredients"] = dict(map(lambda x: (x.arguments[0].value, int(x.arguments[1].value)) if type(x) == wikitextparser.Template else ((x.group(1) + ' ' + x.group(2)).strip(), int(
                    x.group(3))), sorted([*ingredients.templates, *ingredient_regex.finditer(ingredients.value)], key=lambda x: x.span if type(x) == wikitextparser.Template else x.span())))

            return item


class ItemTableParser(HTMLParser):
    def __init__(self, out_lists=None):
        super().__init__()
        self.out_lists = iter(out_lists)  # List of output lists, one per table
        self.out_list = []
        self.in_table = False

    def handle_starttag(self, tag, attrs):
        if attrs == [("class", "wikitable")]:
            self.in_table = True
            self.out_list = next(self.out_lists)

    def handle_endtag(self, tag):
        if tag == "table":
            self.in_table = False

    def handle_data(self, data):
        if self.in_table and data.strip() != "":
            if data in special_cases:
                if hasattr(special_cases[data], "__next__"):
                    data = next(special_cases[data])
                else:
                    data = special_cases[data]
            else:
                data = data.split(" (")[0]
            self.out_list.append(data)
            required_items.add(data)


def parse_bundle(table: wikitextparser.Table):
    name = bundle_name_regex.search(table.data(row=0, column=0)).group()
    section = list(filter(
        lambda section: section.span < table.span, wikitext.sections))[-1].title
    slots = len(bundle_slot_regex.findall(table.data(column=1)[1]))

    gold = 0
    items = []
    if (slots > 0):
        for cell in table.cells(column=2):
            if cell is not None and not cell.has_attr("colspan"):
                if cell.value is None:
                    cell = cell.tables[0].cells(row=0, column=1)

                template = cell.templates[0]
                item_name = template.arguments[0].value

                amount = 1
                if template.name == "name" and len(template.arguments) > 1 and template.arguments[-1].value.isnumeric():
                    amount = int(template.arguments[-1].value)
                else:
                    match = bundle_amount_regex.search(cell.value)
                    if match is not None:
                        amount = int(match.group())

                quality = 0
                if template.name == "Quality":
                    quality = quality_values[template.arguments[1].value]

                items.append({
                    "name": item_name,
                    "amount": amount,
                    "quality": quality
                })

                required_items.add(item_name)
    else:
        gold = int(table.cells(1, 1).templates[0].arguments[0].value)

    return {
        "name": name,
        "section": section,
        "slots": slots,
        "items": items,
        "gold": gold
    }


site = Site("https://stardewvalleywiki.com/mediawiki/api.php")

required_items = set()

special_cases = {
    "Large Egg (brown)": "Large Brown Egg",
    "Egg (brown)": "Brown Egg",
    "Strange Doll": iter(["Strange Doll (green)", "Strange Doll (yellow)"])
}

items_shipped = []
fish = []
artifacts = []
minerals = []
cooking = []
parser = ItemTableParser(
    [items_shipped, items_shipped, fish, artifacts, minerals, cooking, cooking])
parser.feed(site.__call__(action="parse", page="Collections")["parse"]["text"])

wikitext = wikitextparser.parse(site.__call__(
    action="parse", page="Bundles", prop="wikitext")["parse"]["wikitext"])
# Although the word Bundle occurs elsewhere, only in the bundle titles are they the last word.
bundles = [parse_bundle(table)
           for table in wikitext.tables if "Bundle\"" in table.string]

wikitext = wikitextparser.parse(site.__call__(
    action="parse", page="Villagers", prop="wikitext")["parse"]["wikitext"])
villagers = list(map(lambda link: link.title, chain.from_iterable(map(lambda section: section.wikilinks, filter(
    lambda section: section.title in ("[[Marriage|Marriage]] Candidates", "Non-marriage candidates"), wikitext.sections)))))[1:]
friendship = []
for page in site.query_pages(prop="revisions", titles=villagers, rvprop="content"):
    wikitext = wikitextparser.parse(page["revisions"][0]["content"])
    infobox = wikitext.templates[0]

    friendship.append({
        "name": page["title"],
        "favorites": list(map(lambda template: template.arguments[0].value, infobox.get_arg("favorites").templates)),
        "birth_season": infobox.get_arg("birthday").templates[0].arguments[0].value.lower(),
        "birth_day": int(birth_day_regex.search(infobox.get_arg("birthday").value).group())
    })

items = {}

required_items = list(required_items)
for chunk in chunks(required_items, 50):
    for page in site.query_pages(prop="revisions", titles=chunk, rvprop="content", redirects=True):
        if "missing" not in page:
            item = get_item_info(page)
            if item is not None:
                items[page["title"]] = item

for page in site.query_pages(prop="revisions", titles=list(filter(lambda item: item not in items, required_items)), rvprop="content", redirects=False):
    if "missing" not in page:
        items[page["title"]] = {
            "name": page["title"],
            "id": page["title"],
            "redirect": wikitextparser.parse(page["revisions"][0]["content"]).wikilinks[0].title
        }

for chunk in chunks(list(map(lambda item: f"File:{item}.png", items.keys())), 50):
    for page in site.query_pages(prop="imageinfo", titles=chunk, iiprop="url"):
        item_name = page["title"][5:-4]
        if item_name in items:
            items[item_name]["image_url"] = page["imageinfo"][0]["url"]

file = open("output.json", "w")
json.dump({
    "items_shipped": items_shipped,
    "fish": fish,
    "artifacts": artifacts,
    "minerals": minerals,
    "cooking": cooking,
    "bundles": bundles,
    "friendship": friendship,
    "items": items
}, file)
file.close()
