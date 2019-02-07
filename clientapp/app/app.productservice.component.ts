import { Component, OnInit } from "@angular/core";
import { Categories, Product } from "./app.product.model";
import { ProductService } from "./app.products.service";
import { Response } from "@angular/http";
@Component({
  selector: "app-productservice-component",
  templateUrl: "./app.product.view.html"
})
export class ProductServiceComponent implements OnInit {
  product: Product;
  products: Array<Product>;
  // categories locally
  categories = Categories;
  tableHeaders: Array<string>;
  constructor(private serv: ProductService) {
    this.product = new Product("", 0, "", "", "", 0);
    this.products = new Array<Product>();
    this.tableHeaders = new Array<string>();
  }
  ngOnInit(): void {
    for (let p of Object.keys(this.product)) {
      this.tableHeaders.push(p);
    }
    // make call to REST API and get data
    this.serv.getData().subscribe(
      (resp: Response) => {
        this.products = resp.json().data;
        console.log(resp.json().data);
      },
      error => {
        console.log(`Error Occured ${error}`);
      }
    );
  }
  clear(): void {
    this.product = new Product("", 0, "", "", "", 0);
  }
  save(): void {
    // make call to REST API and get data
    this.serv.postData(this.product).subscribe(
      (resp: Response) => {
        this.products.push(resp.json().data);
        console.log(resp.json().data);
      },
      error => {
        console.log(`Error Occured ${error}`);
      }
    );
  }
  getselectedrow(p: Product): void {
    // 1. Create a deep copy of the selected product
    // 2. assign that copy to this.product
    this.product = Object.assign({}, p);
  }
}
