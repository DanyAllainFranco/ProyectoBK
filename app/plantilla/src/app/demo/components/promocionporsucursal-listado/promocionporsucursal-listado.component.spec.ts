import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionporsucursalListadoComponent } from './promocionporsucursal-listado.component';

describe('PromocionporsucursalListadoComponent', () => {
  let component: PromocionporsucursalListadoComponent;
  let fixture: ComponentFixture<PromocionporsucursalListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionporsucursalListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionporsucursalListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
