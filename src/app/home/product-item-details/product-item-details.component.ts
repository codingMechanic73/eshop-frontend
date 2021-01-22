import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/service/auth.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.scss']
})
export class ProductItemDetailsComponent implements OnInit {
  product: Product = new Product();
  isLoggedIn: boolean;
  loading: boolean;

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private oderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService
      .getProductById(id)
      .subscribe(product => {
        setTimeout(() => {
          this.loading = false;
          this.product = product;
        }, 500);

      }, error => console.log(error));
    this.authService.user.subscribe(user => {
      this.isLoggedIn = user.token !== null;
      console.log(user)
    }
    );

    this.isLoggedIn = this.authService.getToken() !== null;
    console.log(this.isLoggedIn)
  }

  addToCart() {
    this.oderService.saveProductToCart(this.product);
    this.router.navigate([`order/create`]);
  }

}
