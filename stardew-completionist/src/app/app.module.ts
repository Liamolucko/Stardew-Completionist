import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ItemButtonComponent } from './item-button/item-button.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { DataService } from './data/data.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ItemButtonComponent,
    ItemGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
