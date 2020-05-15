import { Component, OnInit, Input } from '@angular/core';
import { DataService, Item } from '../data/data.service';
import { MatDialog } from '@angular/material/dialog'
import { ItemInfoComponent } from '../item-info/item-info.component';

@Component({
  selector: 'item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss']
})
export class ItemButtonComponent implements OnInit {
  @Input() id: string
  @Input() item: Item

  constructor(
    private data: DataService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    if (!this.item) {
      await this.data.ready
      this.item = this.data.items.get(this.id)
    }
    }

  onClick() {
    this.dialog.open(ItemInfoComponent, { autoFocus: false, data: { item: this.item } })
  }
}
