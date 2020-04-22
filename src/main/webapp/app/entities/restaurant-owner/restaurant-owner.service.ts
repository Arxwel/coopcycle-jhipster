import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRestaurantOwner } from 'app/shared/model/restaurant-owner.model';

type EntityResponseType = HttpResponse<IRestaurantOwner>;
type EntityArrayResponseType = HttpResponse<IRestaurantOwner[]>;

@Injectable({ providedIn: 'root' })
export class RestaurantOwnerService {
  public resourceUrl = SERVER_API_URL + 'api/restaurant-owners';

  constructor(protected http: HttpClient) {}

  create(restaurantOwner: IRestaurantOwner): Observable<EntityResponseType> {
    return this.http.post<IRestaurantOwner>(this.resourceUrl, restaurantOwner, { observe: 'response' });
  }

  update(restaurantOwner: IRestaurantOwner): Observable<EntityResponseType> {
    return this.http.put<IRestaurantOwner>(this.resourceUrl, restaurantOwner, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRestaurantOwner>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRestaurantOwner[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
