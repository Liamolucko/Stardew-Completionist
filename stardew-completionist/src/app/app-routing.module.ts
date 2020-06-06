import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemGridPageComponent } from './item-grid-page/item-grid-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: ':collection', component: ItemGridPageComponent },
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
