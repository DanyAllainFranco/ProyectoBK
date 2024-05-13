import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteListadoComponent } from './paquete-listado.component';

describe('PaqueteListadoComponent', () => {
  let component: PaqueteListadoComponent;
  let fixture: ComponentFixture<PaqueteListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaqueteListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaqueteListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
