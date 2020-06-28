import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveSelectComponent } from './save-select/save-select.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stardew Completionist';

  constructor(private dialog: MatDialog) { }

  openSaveSelectDialog(): void {
    this.dialog.open(SaveSelectComponent, {
      maxWidth: '50%'
    });
  }
}
