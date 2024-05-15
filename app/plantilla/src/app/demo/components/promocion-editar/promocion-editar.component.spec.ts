import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionEditarComponent } from './promocion-editar.component';

describe('PromocionEditarComponent', () => {
  let component: PromocionEditarComponent;
  let fixture: ComponentFixture<PromocionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
