import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProducts } from '../products';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  isImageRequired: boolean = false;
  imgBtnText: string = 'Show';
  userRating:string = "";
  errMessage:string = "";

  private _listFilter:string = "";
  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter = value;
    console.log("in setter: ", value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProducts[] = [];

  toggleImage() {
    this.isImageRequired = !this.isImageRequired;
  }
  performFilter(filterBy: string): IProducts[]{
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProducts) => product.productName.toLocaleLowerCase().includes(filterBy))
  }

  onNotify(userRating: string){
  this.userRating = userRating;
  }
   sub: Subscription | undefined;
   products: IProducts[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
   this.sub = this.productService.getProducts().subscribe({
      next: product => {this.products = product; this.filteredProducts = this.products;},
      error: err => this.errMessage = err
    }) 
  }

  ngOnDestroy():void {
    this.sub?.unsubscribe()
  }
}
