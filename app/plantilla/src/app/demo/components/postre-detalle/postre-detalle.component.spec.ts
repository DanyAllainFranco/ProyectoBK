import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostreDetalleComponent } from './postre-detalle.component';

describe('PostreDetalleComponent', () => {
  let component: PostreDetalleComponent;
  let fixture: ComponentFixture<PostreDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostreDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostreDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
