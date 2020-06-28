import { Component, OnInit, HostBinding } from '@angular/core';
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
  @HostBinding('class.has-unknown-recipes') get hasUnknownRecipes(): boolean {
    return this.unknownRecipes != null &&
      (this.route.snapshot.params.collection === 'cooking' ||
        this.route.snapshot.params.collection === 'crafting');
  }

  category: string;
  recipes?: Recipe[];
  items: Item[];

  unknownRecipes?: Recipe[];

  constructor(gameInfo: GameInfoService, private route: ActivatedRoute, save: SaveInfoService) {
    route.params.subscribe((params: { collection?: 'shipping' | 'fish' | 'artifacts' | 'minerals' | 'cooking' | 'crafting' }) => {
      if (params.collection) {
        this.category = categoryNames.get(params.collection);
        if (params.collection === 'cooking' || params.collection === 'crafting') {
          this.recipes = gameInfo[params.collection];
          this.items = this.recipes.map(recipe => recipe.result);

          if (save.knownRecipes) {
            this.unknownRecipes = this.recipes.filter(recipe => !save.knownRecipes.includes(recipe.name));
          }
        } else {
          this.items = gameInfo[params.collection];
        }
      }
    });

    save.updated.subscribe(newSave => {
      this.unknownRecipes = this.recipes.filter(recipe => !newSave.knownRecipes.includes(recipe.name));
    });
  }

  ngOnInit(): void { }
}
