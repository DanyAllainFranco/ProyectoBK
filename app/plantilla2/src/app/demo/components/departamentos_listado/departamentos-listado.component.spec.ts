import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosListadoComponent } from './departamentos-listado.component';

describe('DepartamentosListadoComponent', () => {
  let component: DepartamentosListadoComponent;
  let fixture: ComponentFixture<DepartamentosListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentosListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartamentosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
