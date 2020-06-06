import { Component, OnInit } from '@angular/core';
import { GameInfoService, Item } from '../data/game-info.service';
import { SaveInfo, SaveInfoService } from '../data/save-info.service';
import { seasonNames } from '../item-info/item-info.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: Item[];

  get seasonNames(): Map<number, string> { return seasonNames; }

  constructor(public save: SaveInfoService, private gameInfo: GameInfoService) { }

  ngOnInit(): void {
    this.save.updated.subscribe((save: SaveInfo) => {
      this.items = [...this.gameInfo.shipping, ...this.gameInfo.fish].filter(item =>
        item.seasons &&
        item.seasons[seasonNames.get(save.currentSeason).toLowerCase()] &&
        !save.collectedItems.includes(item.id) &&
        Object.values(item.seasons).filter(value => value).length < 3);
    });
  }
}
