import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionCreateComponent } from './promocion-create.component';

describe('PromocionCreateComponent', () => {
  let component: PromocionCreateComponent;
  let fixture: ComponentFixture<PromocionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
