import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IDVerificationComponent } from './id-verification/id-verification.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

const routes: Routes = [
  { path: '', component: IDVerificationComponent },
  { path: 'createaccount', component: CreateAccountComponent },
  { path: 'viewdetails', component: ViewDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
