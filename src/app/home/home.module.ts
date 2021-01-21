import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { ProductsComponent } from './products/products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductItemDetailsComponent } from './product-item-details/product-item-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component';



@NgModule({
  declarations: [MainContentComponent, ProductsComponent, ProductItemComponent, ProductItemDetailsComponent, LandingPageComponent],
  imports: [
    // built in modules
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // third party modules
    NgbModule,

    // user defined modules
    SharedModule
  ],
  exports: [LandingPageComponent]
})
export class HomeModule { }
