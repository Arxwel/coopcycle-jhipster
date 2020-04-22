import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { DelivererUpdateComponent } from 'app/entities/deliverer/deliverer-update.component';
import { DelivererService } from 'app/entities/deliverer/deliverer.service';
import { Deliverer } from 'app/shared/model/deliverer.model';

describe('Component Tests', () => {
  describe('Deliverer Management Update Component', () => {
    let comp: DelivererUpdateComponent;
    let fixture: ComponentFixture<DelivererUpdateComponent>;
    let service: DelivererService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [DelivererUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DelivererUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DelivererUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DelivererService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Deliverer(123);
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
        const entity = new Deliverer();
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
