import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { INotification, Notification } from 'app/shared/model/notification.model';
import { NotificationService } from './notification.service';
import { IBasket } from 'app/shared/model/basket.model';
import { BasketService } from 'app/entities/basket/basket.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

type SelectableEntity = IBasket | IRole;

@Component({
  selector: 'jhi-notification-update',
  templateUrl: './notification-update.component.html'
})
export class NotificationUpdateComponent implements OnInit {
  isSaving = false;
  baskets: IBasket[] = [];
  roles: IRole[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    notification: [],
    notifications: []
  });

  constructor(
    protected notificationService: NotificationService,
    protected basketService: BasketService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notification }) => {
      if (!notification.id) {
        const today = moment().startOf('day');
        notification.date = today;
      }

      this.updateForm(notification);

      this.basketService.query().subscribe((res: HttpResponse<IBasket[]>) => (this.baskets = res.body || []));

      this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
    });
  }

  updateForm(notification: INotification): void {
    this.editForm.patchValue({
      id: notification.id,
      date: notification.date ? notification.date.format(DATE_TIME_FORMAT) : null,
      notification: notification.notification,
      notifications: notification.notifications
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notification = this.createFromForm();
    if (notification.id !== undefined) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  private createFromForm(): INotification {
    return {
      ...new Notification(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      notification: this.editForm.get(['notification'])!.value,
      notifications: this.editForm.get(['notifications'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IRole[], option: IRole): IRole {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
