import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDeliverer } from 'app/shared/model/deliverer.model';

type EntityResponseType = HttpResponse<IDeliverer>;
type EntityArrayResponseType = HttpResponse<IDeliverer[]>;

@Injectable({ providedIn: 'root' })
export class DelivererService {
  public resourceUrl = SERVER_API_URL + 'api/deliverers';

  constructor(protected http: HttpClient) {}

  create(deliverer: IDeliverer): Observable<EntityResponseType> {
    return this.http.post<IDeliverer>(this.resourceUrl, deliverer, { observe: 'response' });
  }

  update(deliverer: IDeliverer): Observable<EntityResponseType> {
    return this.http.put<IDeliverer>(this.resourceUrl, deliverer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeliverer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeliverer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
