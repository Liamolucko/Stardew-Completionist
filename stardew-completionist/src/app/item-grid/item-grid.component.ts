import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService, Item } from '../data/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemGridComponent implements OnInit {
  items: Item[]

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> {
    await this.data.ready
    this.items = this.data[this.route.snapshot.url[0].path]
    this.changeDetector.detectChanges()
  }
}
