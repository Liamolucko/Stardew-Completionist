import { Component, OnInit, ViewChild } from '@angular/core';
import { GameInfoService, Item, seasonNames } from '../data/game-info.service';
import { SaveInfo, SaveInfoService } from '../data/save-info.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { range } from '../friendship/friendship.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  seasonalItems: Item[];
  birthdays: Birthday[];
  upcomingBirthdays = new MatTableDataSource<Birthday>();

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) { this.upcomingBirthdays.paginator = paginator; }

  get range(): (size: number, startAt?: number) => number[] { return range; }
  get seasonNames(): Map<number, string> { return seasonNames; }

  constructor(public save: SaveInfoService, private gameInfo: GameInfoService) {
    this.birthdays = gameInfo.villagers
      .map(villager => ({
        villager: villager.name,
        datable: villager.datable,
        day: villager.birthday,
        date: villager.birthDate,
        bestGifts: villager.loves
      }))
      .sort((a, b) => a.date - b.date);
  }

  ngOnInit(): void {
    this.save.updated.subscribe((save: SaveInfo) => {
      this.seasonalItems = [...this.gameInfo.shipping, ...this.gameInfo.fish].filter(item =>
        item.seasons &&
        item.seasons[seasonNames.get(save.currentSeason).toLowerCase()] &&
        !save.collectedItems.includes(item.id) &&
        Object.values(item.seasons).filter(value => value).length < 3);

      this.upcomingBirthdays.data = [
        ...this.birthdays.filter(birthday => birthday.date >= this.save.currentDate),
        ...this.birthdays.filter(birthday => birthday.date < this.save.currentDate)
      ];
    });
  }
}

interface Birthday {
  villager: string;
  datable: boolean;
  day: string;
  date: number;
  bestGifts: Item[];
}
