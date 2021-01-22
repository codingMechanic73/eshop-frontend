import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Stepper from 'bs-stepper';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { Address } from 'src/app/model/address';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { AddressService } from 'src/app/service/address.service';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  address: Address = new Address();
  product: Product = new Product();
  quantity: number = 1;

  isSuccess: number = -1;
  message: string = "Please provide valid shipping details";

  constructor(private formBuilder: FormBuilder,
    private orderService: OrderService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.product = this.orderService.getProductFromCart();
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }
  onSelect(data: TabDirective): void {
    console.log(data)
  }


  private stepper: Stepper;
  bookingSuccess: boolean = true;

  next() {
    this.stepper.next();
  }
  prev() {
    this.stepper.previous();
  }

  confirmOrder() {
    let order = new Order();
    order.addressId = this.address.id;
    order.productId = this.product.productId;
    console.log(order);
    this.orderService.confirmOrder(order).subscribe(response => {
      console.log(response)
      this.message="Your order has been confirmed!"
      this.isSuccess = 1;
      this.next();
     }, error => {
      console.log(error);
      this.isSuccess = -1;
      this.message = error;
      this.next();
    })
  }

  onSubmit() {
    console.log(this.address);
    this.addressService.addAddress(this.address).subscribe(addressResponse => {
      console.log(addressResponse);
      this.isSuccess = -1;
      this.message = "Please confirm the order!"
      this.address = addressResponse;
      this.next();
    }, error => {
      console.log(error);
      this.isSuccess = -1;
      this.message = error;
    });

  }
}

