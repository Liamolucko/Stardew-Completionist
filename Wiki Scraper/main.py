import json
import re
import wikitextparser

from pywikiapi import *

bundle_name_regex = re.compile(r"(?<=]] ).*$")
bundle_slot_regex = re.compile(r"\[\[File:Bundle Slot\.png\|center\|link=]]")
bundle_amount_regex = re.compile(r"\((\d+)\)")

quality_values = {
    "silver": 1,
    "gold": 2,
    "iridium": 3
}


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
    else:
        gold = 1

    return {
        "name": name,
        "section": section,
        "slots": slots,
        "items": items,
        "gold": gold
    }


site = Site("https://stardewvalleywiki.com/mediawiki/api.php")
data = site.__call__(action="parse", page="Bundles", prop="wikitext")

wikitext = wikitextparser.parse(data["parse"]["wikitext"])

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
    "friendship": []
}, file)
file.close()
