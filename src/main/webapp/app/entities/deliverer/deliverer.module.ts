import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleSharedModule } from 'app/shared/shared.module';
import { DelivererComponent } from './deliverer.component';
import { DelivererDetailComponent } from './deliverer-detail.component';
import { DelivererUpdateComponent } from './deliverer-update.component';
import { DelivererDeleteDialogComponent } from './deliverer-delete-dialog.component';
import { delivererRoute } from './deliverer.route';

@NgModule({
  imports: [CoopcycleSharedModule, RouterModule.forChild(delivererRoute)],
  declarations: [DelivererComponent, DelivererDetailComponent, DelivererUpdateComponent, DelivererDeleteDialogComponent],
  entryComponents: [DelivererDeleteDialogComponent]
})
export class CoopcycleDelivererModule {}
