import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEmpleadoComponent } from './reporte-empleado.component';

describe('ReporteEmpleadoComponent', () => {
  let component: ReporteEmpleadoComponent;
  let fixture: ComponentFixture<ReporteEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
