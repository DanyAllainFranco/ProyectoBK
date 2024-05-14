import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionDetalleComponent } from './promocion-detalle.component';

describe('PromocionDetalleComponent', () => {
  let component: PromocionDetalleComponent;
  let fixture: ComponentFixture<PromocionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
