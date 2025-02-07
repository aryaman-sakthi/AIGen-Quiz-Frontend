import { Component, OnDestroy, OnInit } from '@angular/core';
import { TextQuizService, QuizText } from '../../service/text-quiz.service';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-text-quiz',
  standalone: false,
  
  templateUrl: './text-quiz.component.html',
  styleUrl: './text-quiz.component.scss'
})
export class TextQuizComponent implements OnInit, OnDestroy{
  currentText: QuizText | null = null;
  quizOver: boolean = false; 

  // Timer
  timer = 100; 
  interval= 100; // 25 second
  private destroy$ = new Subject<void>(); // To handle Cleanup
  

  constructor(private quizService: TextQuizService, private router: Router) {}

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
  async initializeQuestions() {
    await this.quizService.initializeQuestions();
    this.loadQuestion(); // load the first question
  }

  startTimer(){
    this.timer = 100;
    interval(this.interval)
      .pipe(takeUntil(this.destroy$)) // Auto-stop when component is destroyed
      .subscribe(() =>{
        if(this.timer > 0){
          this.timer -= 0;
        } else {
          alert("Oops! You ran out of Time.");
          this.loadQuestion();
        }
      });
  }

  loadQuestion() {
    console.log("Next question loading...");

    this.currentText = this.quizService.getNextQuestion();

    // No more questions left
    if(!this.currentText) {
      this.quizOver = true;
    } else {
      this.startTimer();
    }
  }

  checkAnswer(isAI: boolean) {
    if (this.currentText) {
      if (this.currentText.isAI === isAI) {
        alert(('Correct! Moving to the next Question'));
      } else {
        alert('Wrong: '+this.currentText.desc);
      }
      this.destroy$.next(); // Remove old timer
      setTimeout(() => {
        this.loadQuestion();
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
