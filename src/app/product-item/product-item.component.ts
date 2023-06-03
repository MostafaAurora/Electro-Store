import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';
import { ToCartService } from '../services/to-cart.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart: EventEmitter<CartItem> = new EventEmitter();
  isActive: boolean = false
  quantity: number = 1

  constructor(private cartService: ToCartService) {
    this.product = {
      id: 0,
      name: "",
      price: 0,
      category: "",
      description: "",
      specs: {
        display: "",
        chipset: "",
        storage: "",
        camera: "",
        battery: "",
      },
      url: "",
      url2: ""
    }
   }

  ngOnInit(): void {}


  toCart() {
    this.addToCart.emit({ product: this.product, quantity: this.quantity  });
  }
}
