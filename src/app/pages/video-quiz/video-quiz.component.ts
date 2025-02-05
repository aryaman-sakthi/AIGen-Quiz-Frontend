import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VideoQuizService, QuizVideo } from '../../service/video-quiz.service';

@Component({
  selector: 'app-video-quiz',
  standalone: false,
  
  templateUrl: './video-quiz.component.html',
  styleUrl: './video-quiz.component.scss'
})
export class VideoQuizComponent implements OnInit {
  currentVideo: QuizVideo | null = null;
  quizOver: boolean = false;
  
  constructor(private quizService: VideoQuizService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.initializeQuestions();
  }

  // Initialize the questions and load the first one
  initializeQuestions() {
    this.quizService.initializeQuestions();
    this.loadQuestion(); // load the first question
  }

  loadQuestion() {
    console.log("Next question loading...");
    
    this.currentVideo = this.quizService.getNextQuestion();
    console.log(this.currentVideo);

    // No more questions left
    if (!this.currentVideo) {
      this.quizOver = true; // End the quiz
    }

    this.cdr.detectChanges(); // Manually trigger change detection
  }

  checkAnswer(isAI: boolean) {
    if (this.currentVideo) {
      if (this.currentVideo.isAI === isAI) {
        alert('Correct! Loading next video...');
      } else {
          alert('Wrong! Try the next one.');
      }
      setTimeout(() => {
        this.loadQuestion(); // Load next video
      }, 500);
    }
  }
}
