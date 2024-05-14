import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidaDetalleComponent } from './bebida-detalle.component';

describe('BebidaDetalleComponent', () => {
  let component: BebidaDetalleComponent;
  let fixture: ComponentFixture<BebidaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebidaDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BebidaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
