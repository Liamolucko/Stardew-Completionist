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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollectionPageComponent } from './collection/collection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameInfoService } from './data/game-info.service';
import { SaveInfoService } from './data/save-info.service';
import { FriendshipComponent } from './friendship/friendship.component';
import { ItemButtonComponent } from './item-button/item-button.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { NGFORAGE_CONFIG_PROVIDER } from './ngforage.config';
import { ProbabilityPipe } from './probability.pipe';
import { SaveSelectComponent } from './save-select/save-select.component';
import { TimePipe } from './time.pipe';


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
    FriendshipComponent,
    SaveSelectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.serviceWorker }),
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
    MatPaginatorModule,
    MatSnackBarModule,
    MatListModule
  ],
  entryComponents: [
    ItemInfoComponent,
    SaveSelectComponent
  ],
  providers: [
    SaveInfoService,
    GameInfoService,
    {
      provide: APP_INITIALIZER,
      useFactory: (gameInfo: GameInfoService) => () => gameInfo.load(),
      deps: [GameInfoService],
      multi: true
    },
    NGFORAGE_CONFIG_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
