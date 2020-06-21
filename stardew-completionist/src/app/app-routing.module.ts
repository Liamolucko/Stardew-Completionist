import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CollectionPageComponent } from './collection/collection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendshipComponent } from './friendship/friendship.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'friendship', component: FriendshipComponent },
  { path: ':collection', component: CollectionPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true, preloadingStrategy: PreloadAllModules },
    ),
    BrowserAnimationsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
