import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { RestaurantOwnerComponent } from 'app/entities/restaurant-owner/restaurant-owner.component';
import { RestaurantOwnerService } from 'app/entities/restaurant-owner/restaurant-owner.service';
import { RestaurantOwner } from 'app/shared/model/restaurant-owner.model';

describe('Component Tests', () => {
  describe('RestaurantOwner Management Component', () => {
    let comp: RestaurantOwnerComponent;
    let fixture: ComponentFixture<RestaurantOwnerComponent>;
    let service: RestaurantOwnerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [RestaurantOwnerComponent]
      })
        .overrideTemplate(RestaurantOwnerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RestaurantOwnerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RestaurantOwnerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RestaurantOwner(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.restaurantOwners && comp.restaurantOwners[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
