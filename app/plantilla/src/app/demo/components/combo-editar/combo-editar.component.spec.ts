import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboEditarComponent } from './combo-editar.component';

describe('ComboEditarComponent', () => {
  let component: ComboEditarComponent;
  let fixture: ComponentFixture<ComboEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComboEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
