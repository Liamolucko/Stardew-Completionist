import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameInfoService, Item } from '../data/game-info.service';
import { SaveInfoService } from '../data/save-info.service';
import { ItemInfoComponent } from '../item-info/item-info.component';

@Component({
  selector: 'app-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss']
})
export class ItemButtonComponent implements OnInit {
  @Input() id: string;
  @Input() item: Item;

  @Input() greyOut = false;

  get isGreyedOut(): boolean {
    return this.playerInfo.collectedItems && this.greyOut && !this.playerInfo.collectedItems.includes(this.item.id);
  }

  constructor(private gameInfo: GameInfoService, private playerInfo: SaveInfoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.item) {
      this.item = this.gameInfo.items.get(this.id);
    }
  }

  onClick(): void {
    this.dialog.open(ItemInfoComponent, { autoFocus: false, data: { item: this.item } });
  }
}
