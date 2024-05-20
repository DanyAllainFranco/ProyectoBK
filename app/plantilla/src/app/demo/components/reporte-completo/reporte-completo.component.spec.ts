import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCompletoComponent } from './reporte-completo.component';

describe('ReporteCompletoComponent', () => {
  let component: ReporteCompletoComponent;
  let fixture: ComponentFixture<ReporteCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteCompletoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
