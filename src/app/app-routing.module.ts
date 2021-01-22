import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './guard/user.guard';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { MainContentComponent } from './home/main-content/main-content.component';
import { ProductItemDetailsComponent } from './home/product-item-details/product-item-details.component';
import { ProductItemComponent } from './home/product-item/product-item.component';
import { ProductsComponent } from './home/products/products.component';
import { OrderComponent } from './user/order/order.component';


const routes: Routes = [

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products', component: ProductsComponent
  },
  { path: 'products/detail/:id', component: ProductItemDetailsComponent },
  { path: 'order/create', component: OrderComponent, pathMatch: 'full', canActivate: [UserGuard] },

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
