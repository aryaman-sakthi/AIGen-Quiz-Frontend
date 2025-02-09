import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageQuizService, QuizImage } from '../../service/image-quiz.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-quiz',
  standalone: false,
  
  templateUrl: './image-quiz.component.html',
  styleUrl: './image-quiz.component.scss'
})
export class ImageQuizComponent implements OnInit, OnDestroy{
  images: QuizImage[] = [];

  quizOver: boolean = false;

  timer = 100; 
  interval= 100; // 15 second
  private destroy$ = new Subject<void>(); // To handle Cleanup

  constructor(private quizService: ImageQuizService, private router: Router) {}

  // Start quiz when loading the page
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
    this.quizService.initializeQuestions();
    this.loadQuestion(); // load the first question
  }

  startTimer(){
    this.timer = 100;
    interval(this.interval)
      .pipe(takeUntil(this.destroy$)) // Auto-stop when component is destroyed
      .subscribe(() =>{
        if(this.timer > 0){
          this.timer -= 0.33;
        } else {
          alert("Oops! You ran out of Time.");
          this.loadQuestion();
        }
      });
  }

  loadQuestion() {
    this.destroy$.next(); // Stop current timer
    const nextQuestion = this.quizService.getNextQuestion();

    // check if there is a next question in the queue
    if (nextQuestion) {
      this.images = nextQuestion; // load the question images into the component
      this.startTimer();
    } else {
      this.quizOver=true;
    }

  }


  checkAnswer(selectedImage: QuizImage) {
    //console.log("Selected:",selectedImage);
    if (selectedImage.isAI) {
      alert('Correct! Moving to next question...');
      this.destroy$.next();
      setTimeout(() => {
        this.loadQuestion(); // Load a new question (could also change category here if desired)
      }, 500);
    } else {
      alert('Wrong! Try again.');
      this.timer -= 20; // Penalty for wrong answer
    }
  }

  gotoMenu() {
    if (confirm("Sure you wanna go back to the Menu?")){
      this.router.navigate(['/menu']);
    }
  }

  quit() {
    if(confirm("You sure you wanna quit?? Its not that hard.")){
      this.router.navigate(['']);
    }
  }

  shrinkImage(event: Event) {
    const target = event.target as HTMLElement;
    target.style.transform = 'scale(0.9)';
  }

  unshrinkImage(event: Event) {
    const target = event.target as HTMLElement;
    target.style.transform = 'scale(1)';
  }
}
