import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostreListadoComponent } from './postre-listado.component';

describe('PostreListadoComponent', () => {
  let component: PostreListadoComponent;
  let fixture: ComponentFixture<PostreListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostreListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostreListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
