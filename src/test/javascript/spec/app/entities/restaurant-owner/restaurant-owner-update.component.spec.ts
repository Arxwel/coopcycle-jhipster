import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { RestaurantOwnerUpdateComponent } from 'app/entities/restaurant-owner/restaurant-owner-update.component';
import { RestaurantOwnerService } from 'app/entities/restaurant-owner/restaurant-owner.service';
import { RestaurantOwner } from 'app/shared/model/restaurant-owner.model';

describe('Component Tests', () => {
  describe('RestaurantOwner Management Update Component', () => {
    let comp: RestaurantOwnerUpdateComponent;
    let fixture: ComponentFixture<RestaurantOwnerUpdateComponent>;
    let service: RestaurantOwnerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [RestaurantOwnerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RestaurantOwnerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RestaurantOwnerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RestaurantOwnerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RestaurantOwner(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RestaurantOwner();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
