import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.product);

  }

  moreDetails() {
    this.router.navigate([`products/detail/${this.product.productId}`]);
  }

}
