import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoListadoComponent } from './empleado-listado.component';

describe('EmpleadoListadoComponent', () => {
  let component: EmpleadoListadoComponent;
  let fixture: ComponentFixture<EmpleadoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
