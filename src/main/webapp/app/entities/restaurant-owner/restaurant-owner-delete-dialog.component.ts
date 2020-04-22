import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRestaurantOwner } from 'app/shared/model/restaurant-owner.model';
import { RestaurantOwnerService } from './restaurant-owner.service';

@Component({
  templateUrl: './restaurant-owner-delete-dialog.component.html'
})
export class RestaurantOwnerDeleteDialogComponent {
  restaurantOwner?: IRestaurantOwner;

  constructor(
    protected restaurantOwnerService: RestaurantOwnerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.restaurantOwnerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('restaurantOwnerListModification');
      this.activeModal.close();
    });
  }
}
