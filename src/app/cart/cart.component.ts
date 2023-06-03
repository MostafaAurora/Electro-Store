import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../models/CartItem';
import { ToCartService } from '../services/to-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  name: string = '';
  address: string = '';
  phoneNumber: number = 0;
  paymentNumber: number = 0;
  totalPrice: number = 0;
  quantity: number = 0;

  constructor(private toCartService: ToCartService, private router: Router) {}

  ngOnInit(): void {
    this.toCartService.getItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
    this.updateOrderPrice();
  }


  formNameChange(event: string): void {
    this.name = event
  }


  formAddressChange(event: string): void {
    this.address = event
  }


  formPaymentChange(event: number): void {
    this.paymentNumber = event
  }


  submitForm(): void {
    this.toCartService.makeOrder(
      this.name,
      this.address,
      this.phoneNumber,
      this.paymentNumber as number,
      this.totalPrice
    );
    this.toCartService.emptyCart();
    this.router.navigateByUrl('/success');
  }


  removeItem(cartItem: CartItem) {
    this.toCartService.removeFromCart(cartItem.product.id);
    this.cartItems = this.cartItems.filter((item) => item.product.id !== cartItem.product.id);
    this.updateOrderPrice();
    alert(`product ${cartItem.product.name} has been removed from your cart`)
  }


  updateOrderPrice(): void {
    this.totalPrice = parseFloat(this.toCartService.getTotalPrice().toFixed(2));
  }


  quantityChangeHandler(cartItem: CartItem, event: any) {
    const orderQuantity = event.target.value;
    this.toCartService.updateItemQuantity(cartItem.product.id, orderQuantity);
    this.updateOrderPrice();
  }
}
