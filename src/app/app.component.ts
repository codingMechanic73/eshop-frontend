import {Component, OnInit} from '@angular/core';
import {AppDataService} from './_shared/_services/app-data.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'upgrad-eshop-frontend';
  faShoppingCart = faShoppingCart;

  constructor(private appDataService: AppDataService) {


  }

  ngOnInit(): void {
    this.appDataService.initializeApp();
  }

  closeSubMenus() {

  }
}
