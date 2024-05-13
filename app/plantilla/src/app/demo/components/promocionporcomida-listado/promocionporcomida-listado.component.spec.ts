import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionporcomidaListadoComponent } from './promocionporcomida-listado.component';

describe('PromocionporcomidaListadoComponent', () => {
  let component: PromocionporcomidaListadoComponent;
  let fixture: ComponentFixture<PromocionporcomidaListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionporcomidaListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocionporcomidaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
