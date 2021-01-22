import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { SearchCriteria } from 'src/app/model/searchCriteria';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // searching criteria
  searchCriteria = new SearchCriteria();

  collectionSize: number;
  currentPageNo: number = 1;

  // arrays to hold categories and products
  categories: Array<string> = new Array<string>();
  products: Array<Product> = new Array<Product>();

  // show spinner if loading
  loading: boolean;

  sortForm: FormGroup;

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchCriteria.category = "";
    this.searchCriteria.name = "";
    this.searchCriteria.sortBy = "productId"
    this.searchCriteria.direction = "DESC";
    this.searchCriteria.pageNo = 0;
    this.searchCriteria.pageSize = 10;

    // subscribe to sort order change
    this.sortForm = this.formBuilder.group({
      sortBy: ['Default', Validators.required],
    });
    this.sortOrderChangeListener();

    this.activatedRoute.queryParams.subscribe(parameters => {

      // if category exists and category is home then replace with '' as home refers to all items
      this.searchCriteria.category = parameters['category'] ? (parameters['category'] == 'home' ? '' : parameters['category']) : '';
      // set search criteria to make ajax calls and default values if absent
      this.searchCriteria.name = parameters['name'] ? parameters['name'] : '';
      this.getProductsBasedOnQueryParams();
    });
  }


  getProductsBasedOnQueryParams() {

    this.loading = true;
    this.productService.getAllProducts(this.searchCriteria).subscribe(response => {
      this.products = response['content'];
      this.collectionSize = response['totalElements'];

      setTimeout(() => { this.loading = false; }, 500);

    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  sortOrderChangeListener() {
    this.sortForm.get('sortBy').valueChanges.subscribe(sortBy => {
      console.log(sortBy);
      if (sortBy == "Price Highest") {
        this.searchCriteria.sortBy = "price";
        this.searchCriteria.direction = "DESC"
      } else if (sortBy == "Price Lowest") {
        this.searchCriteria.sortBy = "price";
        this.searchCriteria.direction = "ASC"
      } else if (sortBy == "Newest") {
        this.searchCriteria.sortBy = "created";
        this.searchCriteria.direction = "DESC"
      } else {
        this.searchCriteria.sortBy = "productId";
        this.searchCriteria.direction = "DESC";
      }
      this.currentPageNo = 1;
      this.searchCriteria.pageNo = 0; // when sort order changes set the page to 1
      this.getProductsBasedOnQueryParams();
    })
  }

  handleSorting(sortBy) {
    this.searchCriteria.sortBy = sortBy;
    this.getProductsBasedOnQueryParams();
  }

  handlePageChange(pageNo) {
    this.currentPageNo = pageNo;
    this.searchCriteria.pageNo = this.currentPageNo - 1;
    console.log(pageNo);
    this.getProductsBasedOnQueryParams();
  }

}