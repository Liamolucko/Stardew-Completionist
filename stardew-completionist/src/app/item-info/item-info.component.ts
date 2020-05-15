import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, DataService } from '../data/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


const categories = new Map<string, string>([
  ['-4', 'Any Fish'],
  ['-5', 'Egg'],
  ['-6', 'Milk']
])

const locationNames = new Map([
  ['Farm', 'Farm'],
  ['UndergroundMine', 'Mines'],
  ['Mine', 'Mines'],
  ['Desert', 'Desert'],
  ['BusStop', 'Bus Stop'],
  ['Forest', 'Forest'],
  ['Town', 'Pelican Town'],
  ['Mountain', 'Mountain'],
  ['Backwoods', 'Backwoods'],
  ['Railroad', 'Railroad'],
  ['Beach', 'Beach'],
  ['Woods', 'Woods'],
  ['Sewer', 'Sewers'],
  ['BugLand', 'Bug Land'],
  ['WitchSwamp', 'Witch Swamp'],
  ['fishingGame', 'Fishing Game'],
  ['Temp', '???']
])


@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  item: Item
  get ingredients() {
    return Object.entries(this.item.ingredients).map(value => {
      return [categories.has(value[0]) ? categories.get(value[0]) : this.dataService.items.get(value[0]).name, value[1]]
    })
  }
  get artifactSpots() {
    return Object.entries(this.item.artifactSpots).map(value => {
      return [locationNames.get(value[0]), value[1]]
    })
  }

  get monsterDrops() {
    return Object.entries(this.item.monsterDrops)
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private dataService: DataService) { }

  ngOnInit() {
    this.item = this.data.item
  }
}
