import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosListadoComponent } from './alimento-listado.component';

describe('AlimentosListadoComponent', () => {
  let component: AlimentosListadoComponent;
  let fixture: ComponentFixture<AlimentosListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentosListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimentosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
