import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteEditarComponent } from './paquete-editar.component';

describe('PaqueteEditarComponent', () => {
  let component: PaqueteEditarComponent;
  let fixture: ComponentFixture<PaqueteEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaqueteEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaqueteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
