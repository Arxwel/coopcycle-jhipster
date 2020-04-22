import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeliverer } from 'app/shared/model/deliverer.model';
import { DelivererService } from './deliverer.service';
import { DelivererDeleteDialogComponent } from './deliverer-delete-dialog.component';

@Component({
  selector: 'jhi-deliverer',
  templateUrl: './deliverer.component.html'
})
export class DelivererComponent implements OnInit, OnDestroy {
  deliverers?: IDeliverer[];
  eventSubscriber?: Subscription;

  constructor(protected delivererService: DelivererService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.delivererService.query().subscribe((res: HttpResponse<IDeliverer[]>) => (this.deliverers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDeliverers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDeliverer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDeliverers(): void {
    this.eventSubscriber = this.eventManager.subscribe('delivererListModification', () => this.loadAll());
  }

  delete(deliverer: IDeliverer): void {
    const modalRef = this.modalService.open(DelivererDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.deliverer = deliverer;
  }
}
