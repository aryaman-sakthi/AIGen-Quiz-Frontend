import { Component, OnInit } from '@angular/core';
import { TextQuizService, QuizText } from '../../service/text-quiz.service';

@Component({
  selector: 'app-text-quiz',
  standalone: false,
  
  templateUrl: './text-quiz.component.html',
  styleUrl: './text-quiz.component.scss'
})
export class TextQuizComponent implements OnInit{
  currentText: QuizText | null = null;
  quizOver: boolean = false; 

  constructor(private quizService: TextQuizService) {}

  ngOnInit(): void {
      this.initializeQuestions();
  }

  // Initialize the questions and load the first one
  async initializeQuestions() {
    await this.quizService.initializeQuestions();
    this.loadQuestion(); // load the first question
  }

  loadQuestion() {
    console.log("Next question loading...");

    this.currentText = this.quizService.getNextQuestion();

    // No more questions left
    if(!this.currentText) {
      this.quizOver = true;
    }
  }

  checkAnswer(isAI: boolean) {
    if (this.currentText) {
      if (this.currentText.isAI === isAI) {
        alert(('Correct! Moving to the next Question'));
      } else {
        alert('Wrong: '+this.currentText.desc);
      }
      setTimeout(() => {
        this.loadQuestion();
      }, 500);
    }
  }

}
