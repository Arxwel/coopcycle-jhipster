import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.CoopcycleRoleModule)
      },
      {
        path: 'user-account',
        loadChildren: () => import('./user-account/user-account.module').then(m => m.CoopcycleUserAccountModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.CoopcycleRestaurantModule)
      },
      {
        path: 'restaurant-owner',
        loadChildren: () => import('./restaurant-owner/restaurant-owner.module').then(m => m.CoopcycleRestaurantOwnerModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.CoopcycleCustomerModule)
      },
      {
        path: 'deliverer',
        loadChildren: () => import('./deliverer/deliverer.module').then(m => m.CoopcycleDelivererModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.CoopcycleNotificationModule)
      },
      {
        path: 'cooperative',
        loadChildren: () => import('./cooperative/cooperative.module').then(m => m.CoopcycleCooperativeModule)
      },
      {
        path: 'basket',
        loadChildren: () => import('./basket/basket.module').then(m => m.CoopcycleBasketModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.CoopcycleProductModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./payment/payment.module').then(m => m.CoopcyclePaymentModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class CoopcycleEntityModule {}
