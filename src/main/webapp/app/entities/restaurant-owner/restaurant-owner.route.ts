import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRestaurantOwner, RestaurantOwner } from 'app/shared/model/restaurant-owner.model';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { RestaurantOwnerComponent } from './restaurant-owner.component';
import { RestaurantOwnerDetailComponent } from './restaurant-owner-detail.component';
import { RestaurantOwnerUpdateComponent } from './restaurant-owner-update.component';

@Injectable({ providedIn: 'root' })
export class RestaurantOwnerResolve implements Resolve<IRestaurantOwner> {
  constructor(private service: RestaurantOwnerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRestaurantOwner> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((restaurantOwner: HttpResponse<RestaurantOwner>) => {
          if (restaurantOwner.body) {
            return of(restaurantOwner.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RestaurantOwner());
  }
}

export const restaurantOwnerRoute: Routes = [
  {
    path: '',
    component: RestaurantOwnerComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.restaurantOwner.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RestaurantOwnerDetailComponent,
    resolve: {
      restaurantOwner: RestaurantOwnerResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.restaurantOwner.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RestaurantOwnerUpdateComponent,
    resolve: {
      restaurantOwner: RestaurantOwnerResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.restaurantOwner.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RestaurantOwnerUpdateComponent,
    resolve: {
      restaurantOwner: RestaurantOwnerResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.restaurantOwner.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
