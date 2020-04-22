import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRestaurantOwner } from 'app/shared/model/restaurant-owner.model';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { RestaurantOwnerDeleteDialogComponent } from './restaurant-owner-delete-dialog.component';

@Component({
  selector: 'jhi-restaurant-owner',
  templateUrl: './restaurant-owner.component.html'
})
export class RestaurantOwnerComponent implements OnInit, OnDestroy {
  restaurantOwners?: IRestaurantOwner[];
  eventSubscriber?: Subscription;

  constructor(
    protected restaurantOwnerService: RestaurantOwnerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.restaurantOwnerService.query().subscribe((res: HttpResponse<IRestaurantOwner[]>) => (this.restaurantOwners = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRestaurantOwners();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRestaurantOwner): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRestaurantOwners(): void {
    this.eventSubscriber = this.eventManager.subscribe('restaurantOwnerListModification', () => this.loadAll());
  }

  delete(restaurantOwner: IRestaurantOwner): void {
    const modalRef = this.modalService.open(RestaurantOwnerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.restaurantOwner = restaurantOwner;
  }
}
