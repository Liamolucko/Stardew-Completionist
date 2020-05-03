import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "shipping", component: ItemGridComponent },
  { path: "fish", component: ItemGridComponent },
  { path: "artifacts", component: ItemGridComponent },
  { path: "minerals", component: ItemGridComponent },
  { path: "cooking", component: ItemGridComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
