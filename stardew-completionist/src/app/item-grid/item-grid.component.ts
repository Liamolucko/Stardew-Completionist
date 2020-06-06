import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../data/game-info.service';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit {
  @Input() items: Item[];
  @Input() greyOut: boolean;

  constructor() { }

  ngOnInit(): void { }

}
