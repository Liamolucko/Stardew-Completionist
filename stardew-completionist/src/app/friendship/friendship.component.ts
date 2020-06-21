import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GameInfoService } from '../data/game-info.service';
import { SaveInfoService } from '../data/save-info.service';

export const range = (size: number, startAt = 0): number[] => [...Array(size).keys()].map(i => i + startAt);

@Component({
  selector: 'app-friendship',
  templateUrl: './friendship.component.html',
  styleUrls: ['./friendship.component.scss']
})
export class FriendshipComponent implements OnInit {
  shownColumns = ['name', 'birthday', 'bestGifts'];
  villagers = new MatTableDataSource(this.gameInfo.villagers);

  get range(): (size: number, startAt?: number) => number[] { return range; }

  @ViewChild(MatSort, { static: true }) set sort(value: MatSort) { this.villagers.sort = value; }

  constructor(public gameInfo: GameInfoService, save: SaveInfoService) {
    this.villagers.sortingDataAccessor = (data, id) => {
      switch (id) {
        case 'birthday':
          return data.birthDate;
        case 'hearts':
          return data.relationship?.hearts;
        default:
          return data[id] as string | number;
      }
    };

    save.updated.subscribe(() => {
      this.shownColumns = ['name', 'hearts', 'birthday', 'bestGifts'];
      this.villagers.data = this.gameInfo.villagers
        .filter(villager => villager.relationship?.hearts < villager.relationship?.maxHearts);
    });
  }

  ngOnInit(): void { }
}
