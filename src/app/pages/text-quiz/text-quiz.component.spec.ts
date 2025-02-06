import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextQuizComponent } from './text-quiz.component';

describe('TextQuizComponent', () => {
  let component: TextQuizComponent;
  let fixture: ComponentFixture<TextQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
