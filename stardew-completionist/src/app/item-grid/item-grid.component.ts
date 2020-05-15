import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService, Item } from '../data/data.service';
import { ActivatedRoute } from '@angular/router';

const categoryNames = new Map<string, string>([
  ["shipping", "Items Shipped"],
  ["fish", "Fish"],
  ["artifacts", "Artifacts"],
  ["minerals", "Minerals"],
  ["cooking", "Cooking"],
  ["bundles", "Bundles"],
  ["friendship", "Friendship"]
])

@Component({
  selector: 'item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit {
  category = categoryNames.get(this.route.snapshot.url[0].path)
  items: Item[]

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.data.ready
    this.items = this.data[this.route.snapshot.url[0].path]
  }
}
