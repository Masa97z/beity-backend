import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FamiliesModule } from './families/families.module';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { InventoryLogsModule } from './inventory-logs/inventory-logs.module';
import { BillsModule } from './bills/bills.module';
import { RequestsModule } from './requests/requests.module';
import { PlansModule } from './plans/plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { GlobalProductsModule } from './global-products/global-products.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, FamiliesModule, CategoriesModule, ItemsModule, InventoryLogsModule, BillsModule, RequestsModule, PlansModule, SubscriptionsModule, NotificationsModule, ActivityLogsModule, GlobalProductsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
