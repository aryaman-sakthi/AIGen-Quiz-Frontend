import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongQuizComponent } from './song-quiz.component';

describe('SongQuizComponent', () => {
  let component: SongQuizComponent;
  let fixture: ComponentFixture<SongQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
