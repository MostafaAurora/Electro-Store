import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../models/CartItem';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class ToCartService {
  cartItems : CartItem[] = [];

  order: Order = {
    customer: '',
    shippingAddress: '',
    phoneNumber: 0,
    paymentNumber: 0,
    total: 0
  }

  constructor() {}

  getItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }


  addToCart(item: CartItem): void {
    if (this.cartItems.some((cartItem) => cartItem.product.id === item.product.id )) {
      this.cartItems = this.cartItems.map((cartItem) => cartItem.product.id === item.product.id
        ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem)
    }
    else {
      this.cartItems.push(item)
    }
  }


  removeFromCart(id: number): void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.product.id !== id);
  }


  updateItemQuantity(id: number, quantity: number): void {
    this.cartItems = this.cartItems.map((cartItem) => cartItem.product.id === id
    ? { ...cartItem, quantity: quantity } : cartItem);
  }


  emptyCart(): void {
    this.cartItems = [];
  }


  makeOrder(customer: string, shippingAddress: string, phoneNumber: number, paymentNumber: number, total: number): void {
    this.order = {
      customer,
      shippingAddress,
      phoneNumber,
      paymentNumber,
      total,
    };
  }


  getTotalPrice(): number {
    return this.cartItems.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);
  }


  getOrder(): Order {
    return this.order;
  }
}
