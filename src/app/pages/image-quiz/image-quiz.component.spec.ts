import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageQuizComponent } from './image-quiz.component';

describe('ImageQuizComponent', () => {
  let component: ImageQuizComponent;
  let fixture: ComponentFixture<ImageQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
