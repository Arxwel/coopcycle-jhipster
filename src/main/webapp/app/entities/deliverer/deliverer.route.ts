import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDeliverer, Deliverer } from 'app/shared/model/deliverer.model';
import { DelivererService } from './deliverer.service';
import { DelivererComponent } from './deliverer.component';
import { DelivererDetailComponent } from './deliverer-detail.component';
import { DelivererUpdateComponent } from './deliverer-update.component';

@Injectable({ providedIn: 'root' })
export class DelivererResolve implements Resolve<IDeliverer> {
  constructor(private service: DelivererService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliverer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((deliverer: HttpResponse<Deliverer>) => {
          if (deliverer.body) {
            return of(deliverer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Deliverer());
  }
}

export const delivererRoute: Routes = [
  {
    path: '',
    component: DelivererComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.deliverer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DelivererDetailComponent,
    resolve: {
      deliverer: DelivererResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.deliverer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DelivererUpdateComponent,
    resolve: {
      deliverer: DelivererResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.deliverer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DelivererUpdateComponent,
    resolve: {
      deliverer: DelivererResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.deliverer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
