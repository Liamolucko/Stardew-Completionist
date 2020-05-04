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

  constructor(private data: DataService) { }

  ngOnInit(): void {
    if (!this.item) {
      this.item = this.data.items[this.itemName]
    }
  }
}
