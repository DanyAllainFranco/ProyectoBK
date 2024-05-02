import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadocivilListadoComponent } from './estadocivil-listado.component';

describe('EstadocivilListadoComponent', () => {
  let component: EstadocivilListadoComponent;
  let fixture: ComponentFixture<EstadocivilListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadocivilListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadocivilListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
