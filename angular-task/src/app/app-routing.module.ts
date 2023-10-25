import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LeadsComponent } from './components/leads/leads.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'leads', component: LeadsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
