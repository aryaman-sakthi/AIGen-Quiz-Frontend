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
  disableInput: boolean = false;

  score: number = 0;
  totalquestions: number = 10; // Since I'm always taking 10 questions, total number is hardcoded

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
      this.disableInput = false; // Re-enable selection
      this.images = nextQuestion; // load the question images into the component
      this.startTimer();
    } else {
      this.quizOver=true;
    }

  }


  checkAnswer(selectedImage: QuizImage) {
    if (this.disableInput) return; // Prevent user from clicking during answer reveal

    if (selectedImage.isAI) {
      alert('Correct! Moving to next question...');
      this.score += 1;
      this.destroy$.next();
      setTimeout(() => {
        this.loadQuestion();
      }, 500);
    } else {
      alert('Wrong! The correct answer is highlighted.');
  
      // Find the correct answer and highlight it
      const correctAnswer = this.images.find(image => image.isAI);
      if (correctAnswer) {
        correctAnswer.highlighted = true; // Add a highlighted flag for UI changes
      }

      this.disableInput = true; // Disable further selection
  
      // Move to the next question after 2 seconds
      setTimeout(() => {
        this.loadQuestion();
      }, 2000);
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
