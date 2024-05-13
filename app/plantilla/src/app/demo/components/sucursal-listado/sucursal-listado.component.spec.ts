import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalListadoComponent } from './sucursal-listado.component';

describe('SucursalListadoComponent', () => {
  let component: SucursalListadoComponent;
  let fixture: ComponentFixture<SucursalListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucursalListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucursalListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
