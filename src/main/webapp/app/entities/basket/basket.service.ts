import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBasket } from 'app/shared/model/basket.model';

type EntityResponseType = HttpResponse<IBasket>;
type EntityArrayResponseType = HttpResponse<IBasket[]>;

@Injectable({ providedIn: 'root' })
export class BasketService {
  public resourceUrl = SERVER_API_URL + 'api/baskets';

  constructor(protected http: HttpClient) {}

  create(basket: IBasket): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(basket);
    return this.http
      .post<IBasket>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(basket: IBasket): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(basket);
    return this.http
      .put<IBasket>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBasket>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBasket[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(basket: IBasket): IBasket {
    const copy: IBasket = Object.assign({}, basket, {
      expectedDeliveryTime:
        basket.expectedDeliveryTime && basket.expectedDeliveryTime.isValid() ? basket.expectedDeliveryTime.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.expectedDeliveryTime = res.body.expectedDeliveryTime ? moment(res.body.expectedDeliveryTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((basket: IBasket) => {
        basket.expectedDeliveryTime = basket.expectedDeliveryTime ? moment(basket.expectedDeliveryTime) : undefined;
      });
    }
    return res;
  }
}
