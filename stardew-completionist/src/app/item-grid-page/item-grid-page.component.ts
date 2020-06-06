import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameInfoService, Item } from '../data/game-info.service';

const categoryNames = new Map<string, string>([
  ['shipping', 'Items Shipped'],
  ['fish', 'Fish'],
  ['artifacts', 'Artifacts'],
  ['minerals', 'Minerals'],
  ['cooking', 'Cooking'],
  ['bundles', 'Bundles'],
  ['friendship', 'Friendship']
]);

@Component({
  selector: 'app-item-grid-page',
  templateUrl: './item-grid-page.component.html',
  styleUrls: ['./item-grid-page.component.scss']
})
export class ItemGridPageComponent implements OnInit {
  category: string;
  items: Item[];

  constructor(gameInfo: GameInfoService, route: ActivatedRoute) {
    route.params.subscribe((params: { collection?: 'shipping' | 'fish' | 'artifacts' | 'minerals' | 'cooking' }) => {
      if (params.collection) {
        this.items = gameInfo[params.collection];
        this.category = categoryNames.get(params.collection);
      }
    });
  }

  ngOnInit(): void { }
}
