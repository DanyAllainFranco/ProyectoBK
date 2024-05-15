import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementoDetalleComponent } from './complemento-detalle.component';

describe('ComplementoDetalleComponent', () => {
  let component: ComplementoDetalleComponent;
  let fixture: ComponentFixture<ComplementoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplementoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplementoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
