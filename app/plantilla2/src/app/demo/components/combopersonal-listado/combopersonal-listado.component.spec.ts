import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombopersonalListadoComponent } from './combopersonal-listado.component';

describe('CombopersonalListadoComponent', () => {
  let component: CombopersonalListadoComponent;
  let fixture: ComponentFixture<CombopersonalListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombopersonalListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CombopersonalListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
