import { Component, OnInit } from '@angular/core';
import { ImageQuizService, QuizImage } from '../../service/image-quiz.service';
import { sequenceEqual } from 'rxjs';

@Component({
  selector: 'app-image-quiz',
  standalone: false,
  
  templateUrl: './image-quiz.component.html',
  styleUrl: './image-quiz.component.scss'
})
export class ImageQuizComponent implements OnInit {
  images: QuizImage[] = [];

  constructor(private quizService: ImageQuizService) {}

  ngOnInit(): void {
      this.initializeQuestions();
  }

  // Initialize the questions and load the first one
  initializeQuestions() {
    this.quizService.initializeQuestions();
    this.loadQuestion(); // load the first question
  }

  loadQuestion() {
    const nextQuestion = this.quizService.getNextQuestion();

    // check if there is a next question in the queue
    if (nextQuestion) {
      this.images = nextQuestion; // load the question images into the component
    } else {
      alert('No more questions'); // To be changed later
    }

  }

  checkAnswer(selectedImage: QuizImage) {
    //console.log("Selected:",selectedImage);
    if (selectedImage.isAI) {
      alert('Correct! Moving to next question...');
      setTimeout(() => {
        this.loadQuestion(); // Load a new question (could also change category here if desired)
      }, 1000);
    } else {
      alert('Wrong! Try again.');
    }
  }
}
