import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule) // lazy load routes with Modules
  },
  {
    path: 'user-detail',
    loadChildren: () => import('./user-detail/user-detail.module').then(m => m.UserDetailModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    // LoginComponent,
    // UserDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    // RouterModule.forRoot([
    //   { path: '', component: HomeComponent, pathMatch: 'full' },
    //   { path: 'login', component: LoginComponent },
    //   { path: 'user-detail', component: UserDetailComponent },
    // ]),
    RouterModule.forRoot(appRoutes),

    // LoginModule,
    // UserDetailModule
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
