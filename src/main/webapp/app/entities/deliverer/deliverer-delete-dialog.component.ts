import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliverer } from 'app/shared/model/deliverer.model';
import { DelivererService } from './deliverer.service';

@Component({
  templateUrl: './deliverer-delete-dialog.component.html'
})
export class DelivererDeleteDialogComponent {
  deliverer?: IDeliverer;

  constructor(protected delivererService: DelivererService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.delivererService.delete(id).subscribe(() => {
      this.eventManager.broadcast('delivererListModification');
      this.activeModal.close();
    });
  }
}
