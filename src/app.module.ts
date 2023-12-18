import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [UsersModule, AuthModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
