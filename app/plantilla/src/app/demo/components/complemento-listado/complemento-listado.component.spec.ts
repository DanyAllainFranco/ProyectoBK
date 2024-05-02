import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementoListadoComponent } from './complemento-listado.component';

describe('ComplementoListadoComponent', () => {
  let component: ComplementoListadoComponent;
  let fixture: ComponentFixture<ComplementoListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementoListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplementoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
