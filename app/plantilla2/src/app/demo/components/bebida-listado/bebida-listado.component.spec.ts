import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidaListadoComponent } from './bebida-listado.component';

describe('BebidaListadoComponent', () => {
  let component: BebidaListadoComponent;
  let fixture: ComponentFixture<BebidaListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BebidaListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BebidaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
