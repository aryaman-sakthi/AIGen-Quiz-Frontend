import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { SongQuizService, QuizSong } from '../../service/song-quiz.service';
import WaveSurfer from 'wavesurfer.js';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-song-quiz',
  standalone: false,
  
  templateUrl: './song-quiz.component.html',
  styleUrl: './song-quiz.component.scss'
})
export class SongQuizComponent implements AfterViewInit, OnDestroy{
  currentSong: QuizSong | null = null;
  quizOver: boolean = false;

  waveSurfer!: WaveSurfer;

  // Timer
  timer = 100; 
  interval= 50; // 15 second
  private destroy$ = new Subject<void>(); // To handle Cleanup
  

  constructor(private quizService: SongQuizService, private router: Router) {}

  ngAfterViewInit(): void {
    this.initializeWaveSurfer();
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

  // Initialize the wave surfer for audio
  initializeWaveSurfer() {
    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'lightgrey',
      progressColor: 'maroon',
      barWidth: 2,
      height: 100,
    });

    this.waveSurfer.on('ready', () => {
          this.waveSurfer.play();
      });

    this.initializeQuestions();

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
    console.log("Next question loading...");
    
    this.currentSong = this.quizService.getNextQuestion();
    console.log(this.currentSong);

    // No more questions left
    if (!this.currentSong) {
      this.quizOver = true; // End the quiz
      return;
    } else {
      this.startTimer();
    }

    this.waveSurfer.load(this.currentSong.path)
  }
  
  checkAnswer(isAI: boolean) {
    if (this.currentSong) {
      if (this.currentSong.isAI === isAI) {
        alert('Correct! Loading next song...');
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
