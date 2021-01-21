import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/shared/service/product.service';
import { SearchService } from 'src/app/shared/service/search.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  // searching criteria
  category: string;
  name: string;

  // arrays to hold categories
  categories: Array<string> = new Array<string>();

  constructor(private productService: ProductService,
    private router: Router,
    private searchService: SearchService) { }

  ngOnInit(): void {

     // fetch categories
    this.productService.getCategories().subscribe(response => {
      console.log(response);
      this.categories = response;
    }, () => {
    });

    // subscribe to the search query in the nav bar
    this.searchService.searchQuery.subscribe(name => {
      this.name = name;
      this.updateRouteParameters();
    })
  }

  handleCategoryChange(category) {
    this.category = category;
    this.updateRouteParameters();
  }

  updateRouteParameters() {
    this.router.navigate(['products'],
      {
        queryParams: {
          category: this.category,
          name: this.name
        },
      });
  }
}
