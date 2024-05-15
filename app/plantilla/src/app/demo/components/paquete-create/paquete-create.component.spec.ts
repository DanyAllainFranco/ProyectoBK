import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteCreateComponent } from './paquete-create.component';

describe('PaqueteCreateComponent', () => {
  let component: PaqueteCreateComponent;
  let fixture: ComponentFixture<PaqueteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaqueteCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaqueteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
