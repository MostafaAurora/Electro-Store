import { Component, OnInit } from '@angular/core';
import { Order } from '../models/Order';
import { ToCartService } from '../services/to-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  order: Order = {
    customer: '',
    shippingAddress: '',
    phoneNumber: 0,
    paymentNumber: 0,
    total: 0,
  }

  constructor(private ToCartService: ToCartService, private router: Router) { }

  ngOnInit(): void {
    this.order = this.ToCartService.getOrder();
    if (this.order.total === 0) this.router.navigateByUrl('/')
  }
}
