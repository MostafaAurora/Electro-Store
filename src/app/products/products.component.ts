import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product'
import { GetProductsService } from '../services/get-products.service';
import { ToCartService } from '../services/to-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private GetProductsService: GetProductsService, private ToCartService: ToCartService) { }

  ngOnInit(): void {
    this.GetProductsService.getProducts().subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        const product = res[index];
      }
      this.products = res;
    });
  }


  addToCart(cartItem: CartItem) {
    this.ToCartService.addToCart(cartItem);
    alert(`${cartItem.quantity} ${cartItem.product.name}${cartItem.quantity > 1 ? '(s) have' : ' has'} been added to your cart.`);
  }
}

