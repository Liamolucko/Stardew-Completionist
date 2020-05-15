import { Component, OnInit, Input } from '@angular/core';
import { DataService, Item } from '../data/data.service';

@Component({
  selector: 'item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss']
})
export class ItemButtonComponent implements OnInit {
  @Input() itemName: string
  @Input() item: Item

  constructor(
    private data: DataService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    if (!this.item) {
      await this.data.ready
      this.item = this.data.items.get(this.itemName)
    }
    }

  onClick() {
    this.dialog.open(ItemInfoComponent, { autoFocus: false, data: { item: this.item } })
  }
}
