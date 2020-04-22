import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { DelivererDetailComponent } from 'app/entities/deliverer/deliverer-detail.component';
import { Deliverer } from 'app/shared/model/deliverer.model';

describe('Component Tests', () => {
  describe('Deliverer Management Detail Component', () => {
    let comp: DelivererDetailComponent;
    let fixture: ComponentFixture<DelivererDetailComponent>;
    const route = ({ data: of({ deliverer: new Deliverer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [DelivererDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DelivererDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DelivererDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load deliverer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.deliverer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
