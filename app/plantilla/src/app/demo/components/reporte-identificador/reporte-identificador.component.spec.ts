import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIdentificadorComponent } from './reporte-identificador.component';

describe('ReporteIdentificadorComponent', () => {
  let component: ReporteIdentificadorComponent;
  let fixture: ComponentFixture<ReporteIdentificadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteIdentificadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteIdentificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
