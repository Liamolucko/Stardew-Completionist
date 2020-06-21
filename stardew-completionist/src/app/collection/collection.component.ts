import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameInfoService, Item, Recipe } from '../data/game-info.service';
import { SaveInfoService } from '../data/save-info.service';

const categoryNames = new Map<string, string>([
  ['shipping', 'Items Shipped'],
  ['fish', 'Fish'],
  ['artifacts', 'Artifacts'],
  ['minerals', 'Minerals'],
  ['cooking', 'Cooking'],
  ['bundles', 'Bundles'],
  ['friendship', 'Friendship'],
  ['crafting', 'Crafting']
]);

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionPageComponent implements OnInit {
  category: string;
  recipes?: Recipe[];
  items: Item[];

  unknownRecipes?: Recipe[];

  constructor(gameInfo: GameInfoService, route: ActivatedRoute, save: SaveInfoService) {
    route.params.subscribe((params: { collection?: 'shipping' | 'fish' | 'artifacts' | 'minerals' | 'cooking' | 'crafting' }) => {
      if (params.collection) {
        this.category = categoryNames.get(params.collection);
        if (params.collection === 'cooking' || params.collection === 'crafting') {
          this.recipes = gameInfo[params.collection];
          this.items = this.recipes.map(recipe => recipe.result);
          this.unknownRecipes = this.recipes.filter(recipe => !save.knownRecipes.includes(recipe.name));
        } else {
          this.items = gameInfo[params.collection];
        }
      }
    });
  }

  ngOnInit(): void { }
}
