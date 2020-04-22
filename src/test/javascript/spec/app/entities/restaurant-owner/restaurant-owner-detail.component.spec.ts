import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { RestaurantOwnerDetailComponent } from 'app/entities/restaurant-owner/restaurant-owner-detail.component';
import { RestaurantOwner } from 'app/shared/model/restaurant-owner.model';

describe('Component Tests', () => {
  describe('RestaurantOwner Management Detail Component', () => {
    let comp: RestaurantOwnerDetailComponent;
    let fixture: ComponentFixture<RestaurantOwnerDetailComponent>;
    const route = ({ data: of({ restaurantOwner: new RestaurantOwner(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [RestaurantOwnerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RestaurantOwnerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RestaurantOwnerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load restaurantOwner on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.restaurantOwner).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
