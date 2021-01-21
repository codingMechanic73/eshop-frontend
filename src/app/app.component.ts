import {Component, OnInit} from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'upgrad-eshop-frontend';
  faShoppingCart = faShoppingCart;

  constructor() {


  }

  ngOnInit(): void {
  }

  closeSubMenus() {

  }
}
