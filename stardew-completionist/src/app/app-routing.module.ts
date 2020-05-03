import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "shipping", component: ItemGridComponent, data: {animationState: "ItemGrid"} },
  { path: "fish", component: ItemGridComponent, data: {animationState: "ItemGrid"} },
  { path: "artifacts", component: ItemGridComponent, data: {animationState: "ItemGrid"} },
  { path: "minerals", component: ItemGridComponent, data: {animationState: "ItemGrid"} },
  { path: "cooking", component: ItemGridComponent, data: {animationState: "ItemGrid"} },
  { path: "**", component: ItemInfoComponent, data: {animationState: "ItemInfo"} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }), BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
