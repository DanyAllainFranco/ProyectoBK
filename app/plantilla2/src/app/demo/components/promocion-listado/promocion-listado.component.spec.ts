import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionListadoComponent } from './promocion-listado.component';

describe('PromocionListadoComponent', () => {
  let component: PromocionListadoComponent;
  let fixture: ComponentFixture<PromocionListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
