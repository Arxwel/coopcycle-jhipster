import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BasketService } from 'app/entities/basket/basket.service';
import { IBasket, Basket } from 'app/shared/model/basket.model';
import { BasketState } from 'app/shared/model/enumerations/basket-state.model';

describe('Service Tests', () => {
  describe('Basket Service', () => {
    let injector: TestBed;
    let service: BasketService;
    let httpMock: HttpTestingController;
    let elemDefault: IBasket;
    let expectedResult: IBasket | IBasket[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BasketService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Basket(0, BasketState.NOTFINISHED, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            expectedDeliveryTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Basket', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            expectedDeliveryTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expectedDeliveryTime: currentDate
          },
          returnedFromService
        );

        service.create(new Basket()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Basket', () => {
        const returnedFromService = Object.assign(
          {
            basketState: 'BBBBBB',
            expectedDeliveryTime: currentDate.format(DATE_TIME_FORMAT),
            deliveryAddress: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expectedDeliveryTime: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Basket', () => {
        const returnedFromService = Object.assign(
          {
            basketState: 'BBBBBB',
            expectedDeliveryTime: currentDate.format(DATE_TIME_FORMAT),
            deliveryAddress: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expectedDeliveryTime: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Basket', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
