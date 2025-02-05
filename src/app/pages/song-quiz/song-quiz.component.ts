import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SongQuizService, QuizSong } from '../../service/song-quiz.service';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-song-quiz',
  standalone: false,
  
  templateUrl: './song-quiz.component.html',
  styleUrl: './song-quiz.component.scss'
})
export class SongQuizComponent implements AfterViewInit{
  currentSong: QuizSong | null = null;
  quizOver: boolean = false;

  waveSurfer!: WaveSurfer;

  constructor(private quizService: SongQuizService) {}

  ngAfterViewInit(): void {
    this.initializeWaveSurfer();
  }

  // Initialize the questions and load the first one
  initializeQuestions() {
    this.quizService.initializeQuestions();
    this.loadQuestion(); // load the first question
  }  

  // Initialize the wave surfer for audio
  initializeWaveSurfer() {
    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'blue',
      progressColor: 'purple',
      barWidth: 2,
      height: 100,
    });

    this.waveSurfer.on('ready', () => {
          this.waveSurfer.play();
      });

    this.initializeQuestions();

  }

  loadQuestion() {
    console.log("Next question loading...");
    
    this.currentSong = this.quizService.getNextQuestion();
    console.log(this.currentSong);

    // No more questions left
    if (!this.currentSong) {
      this.quizOver = true; // End the quiz
      return;
    }

    this.waveSurfer.load(this.currentSong.path)
  }
  
  checkAnswer(isAI: boolean) {
    if (this.currentSong) {
      if (this.currentSong.isAI === isAI) {
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
