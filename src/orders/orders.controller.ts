import { OrdersService } from './orders.service';
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { OrderDto } from './requests';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}
  @Post()
  async create(@Body() payload: OrderDto) {
    this.client.emit('order_created', payload);
    return this.ordersService.create(payload);
  }
}
