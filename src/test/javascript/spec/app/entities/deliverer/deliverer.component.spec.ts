import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { DelivererComponent } from 'app/entities/deliverer/deliverer.component';
import { DelivererService } from 'app/entities/deliverer/deliverer.service';
import { Deliverer } from 'app/shared/model/deliverer.model';

describe('Component Tests', () => {
  describe('Deliverer Management Component', () => {
    let comp: DelivererComponent;
    let fixture: ComponentFixture<DelivererComponent>;
    let service: DelivererService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [DelivererComponent]
      })
        .overrideTemplate(DelivererComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DelivererComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DelivererService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Deliverer(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.deliverers && comp.deliverers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
