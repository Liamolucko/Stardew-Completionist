import json
import re
import wikitextparser

from pywikiapi import *

ingredient_regex = re.compile(
    r"(?:\[\[.+]] )?(.+?) \[\[(?:.+\|)?(.+?)]] \((\d+)\)")

bundle_name_regex = re.compile(r"(?<=]] ).*$")
bundle_slot_regex = re.compile(r"\[\[File:Bundle Slot\.png\|center\|link=]]")
bundle_amount_regex = re.compile(r"\((\d+)\)")

quality_values = {
    "silver": 1,
    "gold": 2,
    "iridium": 3
}


def register_item(name: str):
    if name not in items:
        url = name
        wikitext = wikitextparser.parse(site.__call__(
            action="parse", page=url, prop="wikitext")["parse"]["wikitext"])
        while str(wikitext).startswith("#REDIRECT"):
            url = wikitext.wikilinks[0].title
            wikitext = wikitextparser.parse(site.__call__(
                action="parse", page=url, prop="wikitext")["parse"]["wikitext"])
        if "Infobox" in wikitext.templates[0].string:
            infobox = wikitext.templates[0]

            item = {
                "name": name, "url": f"https://stardewvalleywiki.com/{url.replace(' ', '_')}"}

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
                item["location"] = list(map(lambda link: (link.title if link.text is None else link.text).strip(), location.wikilinks)) if len(
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
                if "sources" in item:
                    item["sources"] += [infobox.get_arg(
                        "craftingstation").templates[0].arguments[0].value.strip()]
                else:
                    item["sources"] = [infobox.get_arg(
                        "craftingstation").templates[0].arguments[0].value]
            if infobox.has_arg("as"):
                if "sources" in item:
                    item["sources"] += map(
                        lambda link: link.title if link.text is None else link.text, infobox.get_arg("as").wikilinks)
                else:
                    item["sources"] = map(
                        lambda link: link.title if link.text is None else link.text, infobox.get_arg("as").wikilinks)
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

            items[name] = item


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
                        amount = int(match.group(1))

                quality = 0
                if template.name == "Quality":
                    quality = quality_values[template.arguments[1].value]

                items.append({
                    "name": item_name,
                    "amount": amount,
                    "quality": quality
                })

                register_item(item_name)
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

items = {}

wikitext = wikitextparser.parse(site.__call__(
    action="parse", page="Bundles", prop="wikitext")["parse"]["wikitext"])

# Although the word Bundle occurs elsewhere, only in the bundle titles are they the last word.
bundles = [parse_bundle(table)
           for table in wikitext.tables if "Bundle\"" in table.string]

file = open("output.json", "w")
json.dump({
    "items_shipped": [],
    "fish": [],
    "artifacts": [],
    "minerals": [],
    "cooking": [],
    "bundles": bundles,
    "friendship": [],
    "items": items
}, file)
file.close()
