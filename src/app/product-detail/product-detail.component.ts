import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ActivatedRoute } from '@angular/router';
import { GetProductsService } from '../services/get-products.service';
import { ToCartService } from '../services/to-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = {
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
  id: number = 0
  quantity: number = 1

  constructor(
    private route: ActivatedRoute,
    private GetProductsService: GetProductsService,
    private ToCartService: ToCartService
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.GetProductsService.getProducts().subscribe((products) => {
      this.product = products.filter((p) => p.id === this.id)[0];
    });
  }

  addToCart() {
    this.ToCartService.addToCart({ product: this.product, quantity: this.quantity  });
    alert(`${this.quantity} ${this.product.name}${this.quantity > 1 ? '(s) have' : ' has'} been added to your cart.`);
  }

}
