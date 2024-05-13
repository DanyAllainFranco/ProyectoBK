import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoListadoComponent } from './cargo-listado.component';

describe('CargoListadoComponent', () => {
  let component: CargoListadoComponent;
  let fixture: ComponentFixture<CargoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
