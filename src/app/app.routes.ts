import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarnComponent } from './pages/earn/earn.component';
import { CalcComponent } from './pages/calc/calc.component';
import { MapComponent } from './pages/map/map.component';
import { PercsComponent } from './pages/percs/percs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HumanComponent } from './ThreD/human/human.component';
import { QuickCalculationComponent } from './pages/calc/quick-calculation/quick-calculation.component';
export const routes: Routes = [
  { path: 'earn', component: EarnComponent },
  { path: 'calc', component: CalcComponent },
  { path: 'map', component: MapComponent },
  { path: 'percs', component: PercsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'earn', pathMatch: 'full' },
  { path: 'human', component: HumanComponent },
  { path: 'quickcalc', component: QuickCalculationComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
