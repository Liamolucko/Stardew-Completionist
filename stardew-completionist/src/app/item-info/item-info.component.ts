import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, DataService } from '../data/data.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  item: Item

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.data.ready
    this.item = this.data.items[this.route.snapshot.url[0].path]
  }
}
