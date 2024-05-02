import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioListadoComponent } from './municipio-listado.component';

describe('MunicipioListadoComponent', () => {
  let component: MunicipioListadoComponent;
  let fixture: ComponentFixture<MunicipioListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MunicipioListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipioListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
