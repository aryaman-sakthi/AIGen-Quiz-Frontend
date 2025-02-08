import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { VideoQuizService, QuizVideo } from '../../service/video-quiz.service';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-video-quiz',
  standalone: false,
  
  templateUrl: './video-quiz.component.html',
  styleUrl: './video-quiz.component.scss'
})
export class VideoQuizComponent implements OnInit, OnDestroy {
  currentVideo: QuizVideo | null = null;
  quizOver: boolean = false;

  score: number = 0;
  totalquestions: number = 0;
  
  // Timer
  timer = 100; 
  interval= 50; // 15 second
  private destroy$ = new Subject<void>(); // To handle Cleanup

  constructor(private quizService: VideoQuizService, private router: Router,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.initializeQuestions();
      this.startTimer();
  }

   // Stop the timer when leaving the page
   ngOnDestroy(): void {
    this.destroy$.next(); // Stop any running timers
    this.destroy$.complete(); // Prevent memory leaks
  }

  // Initialize the questions and load the first one
  initializeQuestions() {
    this.totalquestions = this.quizService.initializeQuestions();
    this.loadQuestion(); // load the first question
  }

  startTimer(){
    this.timer = 100;
    interval(this.interval)
      .pipe(takeUntil(this.destroy$)) // Auto-stop when component is destroyed
      .subscribe(() =>{
        if(this.timer > 0){
          this.timer -= 0.165;
        } else {
          alert("Oops! You ran out of Time.");
          this.loadQuestion();
        }
      });
  }

  loadQuestion() {
    console.log("Next question loading...");
    
    this.currentVideo = this.quizService.getNextQuestion();
    console.log(this.currentVideo);

    // No more questions left
    if (!this.currentVideo) {
      this.quizOver = true; // End the quiz
    } else {
      this.startTimer();

      // Wait for Angular to update the DOM, then reload the video
      setTimeout(() => {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            videoElement.load(); // Ensures the new video loads and plays
            videoElement.play().catch(err => console.log("Autoplay prevented:", err));
        }
      }, 100);
    }

    this.cdr.detectChanges(); // Manually trigger change detection
  }

  checkAnswer(isAI: boolean) {
    if (this.currentVideo) {
      if (this.currentVideo.isAI === isAI) {
        alert('Correct! Loading next video...');
        this.score += 1;
      } else {
          alert('Wrong! Try the next one.');
      }
      this.destroy$.next(); // Remove old timer
      setTimeout(() => {
        this.loadQuestion(); // Load next video
      }, 500);
    }
  }

  gotoMenu() {
    if (confirm("Sure you wanna go back to the Menu?")){
      this.router.navigate(['/menu']);
    }
  }

  quit() {
    if(confirm("You sure you wanna quit?? Its not that difficult.")){
      this.router.navigate(['']);
    }
  }

  button_pressed(event: Event) {
    const target = event.target as HTMLElement;
    target.style.transform = 'scale(0.95)';
    target.style.backgroundColor = '#3d1912';
    target.style.color = '#fff'

  }

  button_released(event: Event) {
    const target = event.target as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.backgroundColor = '#fff';
    target.style.color = '#0d172a'
  }
}
