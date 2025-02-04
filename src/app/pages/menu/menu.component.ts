import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterViewInit {
  @ViewChild('nextButton') nextButton!: ElementRef;
  @ViewChild('prevButton') prevButton!: ElementRef;
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('slider') slider!: ElementRef;
  @ViewChild('thumbnail') thumbnail!: ElementRef;
  @ViewChild('time') time!: ElementRef;

  timeRunning = 3000;
  runTimeOut: any;
  runNextAuto: any;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngAfterViewInit() {
    const nextDom = this.nextButton.nativeElement;
    const prevDom = this.prevButton.nativeElement;
    const carouselDom = this.carousel.nativeElement;
    const sliderDom = this.slider.nativeElement;
    const thumbnailBorderDom = this.thumbnail.nativeElement;

    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    // Move the first thumbnail to the end (looping effect)
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    // Event Listeners using Renderer2 (best practice in Angular)
    this.renderer.listen(nextDom, 'click', () => this.showSlider('next'));
    this.renderer.listen(prevDom, 'click', () => this.showSlider('prev'));

  }

  showSlider(type: string) {
    const sliderDom = this.slider.nativeElement;
    const carouselDom = this.carousel.nativeElement;
    const thumbnailBorderDom = this.thumbnail.nativeElement;

    let sliderItemsDom = sliderDom.querySelectorAll('.item');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    if (type === 'next') {
      sliderDom.appendChild(sliderItemsDom[0]); // Move first item to the end
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
      carouselDom.classList.add('next');
    } else {
      sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]); // Move last item to the beginning
      thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
      carouselDom.classList.add('prev');
    }

    // Reset class after animation
    clearTimeout(this.runTimeOut);
    this.runTimeOut = setTimeout(() => {
      carouselDom.classList.remove('next');
      carouselDom.classList.remove('prev');
    }, this.timeRunning);
  }

  startImageQuiz() {
    console.log("Image Quiz Selected");
    this.router.navigate(['/quiz/images']);
  }
}
