import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncatePipe } from '../pipe/truncate.pipe';



@NgModule({
  declarations: [OrderComponent, TruncatePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [OrderComponent],
})
export class UserModule { }
