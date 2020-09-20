import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';
import { UserDetailService } from './user-detail.service';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule
  ],
  declarations: [
    UserDetailComponent
  ],
  providers: [
    UserDetailService
  ],
  exports: [
    UserDetailComponent
  ]
})
export class UserDetailModule {

}
