import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoDetalleComponent } from './cargo-detalle.component';

describe('CargoDetalleComponent', () => {
  let component: CargoDetalleComponent;
  let fixture: ComponentFixture<CargoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
