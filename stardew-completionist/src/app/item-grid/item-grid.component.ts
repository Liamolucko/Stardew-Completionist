import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit {
  itemGroup: string
  get items() {
    return this.dataService[this.itemGroup]
  }
  dataService: DataService
  route: ActivatedRoute

  constructor(dataService: DataService, route: ActivatedRoute) {
    this.dataService = dataService
    this.route = route
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.itemGroup = url[0].path
    })
  }
}
