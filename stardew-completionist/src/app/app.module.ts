import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameInfoService } from './data/game-info.service';
import { SaveInfoService } from './data/save-info.service';
import { ItemButtonComponent } from './item-button/item-button.component';
import { CollectionPageComponent } from './collection/collection.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ProbabilityPipe } from './probability.pipe';
import { TimePipe } from './time.pipe';
import { FriendshipComponent } from './friendship/friendship.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemButtonComponent,
    CollectionPageComponent,
    DashboardComponent,
    ItemInfoComponent,
    TimePipe,
    ProbabilityPipe,
    ItemGridComponent,
    FriendshipComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  entryComponents: [ItemInfoComponent],
  providers: [
    SaveInfoService,
    GameInfoService,
    {
      provide: APP_INITIALIZER,
      useFactory: (gameInfo: GameInfoService) => () => gameInfo.load(),
      deps: [GameInfoService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
