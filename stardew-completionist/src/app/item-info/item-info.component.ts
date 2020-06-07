import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { categories, GameInfoService, Item, locationNames, weatherNames } from '../data/game-info.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  item: Item;
  ingredients: {
    id: string;
    name: string;
    quantity: number;
  }[];
  artifactSpots: Map<string, number>;

  get weatherNames(): Map<string, string> { return weatherNames; }

  constructor(@Inject(MAT_DIALOG_DATA) private data: { item: Item }, private gameInfo: GameInfoService) {
    this.item = this.data.item;
    if (this.item.ingredients) {
      this.ingredients = Object.entries(this.item.ingredients).map(value => ({
        id: value[0],
        name: categories.has(value[0]) ? categories.get(value[0]) : this.gameInfo.items.get(value[0]).name,
        quantity: value[1]
      }));
    }
    if (this.item.artifactSpots) {
      this.artifactSpots = new Map(Object.entries(this.item.artifactSpots).map(value => [locationNames.get(value[0]), value[1]]));
    }
  }

  ngOnInit(): void { }
}
