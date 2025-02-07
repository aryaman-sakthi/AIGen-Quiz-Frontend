import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  // url: string = "http://localhost:8089/api/users"; Local host url
  url: string = "https://aigen-quiz-backend.onrender.com/api/users";

  name: string = '';
  email: string = '';

  // Background image player
  images: string[] = [
    '/assets/Signup/signup_bg1.jpg',
    '/assets/Signup/signup_bg2.jpg',
    '/assets/Signup/signup_bg3.jpg',
    '/assets/Signup/signup_bg4.jpg',
    '/assets/Signup/signup_bg5.jpg',
    '/assets/Signup/signup_bg6.jpg'
  ];
  currentIndex: number = 0;
  activeBg: boolean = true; // Toggle between two divs
  private bgInterval: any; // Store interval reference

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.setInitialBackground();
    this.changeBackground();
  }

  ngOnDestroy(): void {
    clearInterval(this.bgInterval); // Stop the interval when component is destroyed
  }

  // Set the first background
  setInitialBackground() {
    const bg1 = document.getElementById('bg1')!;
    const bg2 = document.getElementById('bg2')!;
    
    const firstImage = this.images[this.currentIndex];
    bg1.style.backgroundImage = `url(${firstImage})`; 
    bg2.style.backgroundImage = `url(${firstImage})`; // Avoid blank flash
  }

  // Change the background images
  changeBackground() {
    this.bgInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.activeBg = !this.activeBg; // Toggle background layers

      const nextImage = this.images[this.currentIndex];
      const bg1 = document.getElementById('bg1')!;
      const bg2 = document.getElementById('bg2')!;

      if (this.activeBg) {
        bg1.style.backgroundImage = `url(${nextImage})`;
        bg1.style.opacity = '1';
        bg2.style.opacity = '0';
      } else {
        bg2.style.backgroundImage = `url(${nextImage})`;
        bg2.style.opacity = '1';
        bg1.style.opacity = '0';
      }
    }, 10000);
  }

  // Save the user details to the database
  signUp() 
  {
    let bodyData = {
      "name" : this.name,
      "email" : this.email,
    };

    this.http.post(this.url + "/signup", bodyData, {responseType: 'text'}).subscribe((resultData: any) => 
    {
      console.log(resultData);
      this.router.navigate(['/menu']);
      
    },
    (error) => {
      console.error("Error Signing up User: ", error)
      alert("Error Signing up ");
    });
  }

  button_pressed(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.disabled) {
      event.preventDefault(); // Prevent the action if the button is disabled
      return; // Exit early
    }
    target.style.transform = 'scale(0.9)';
    target.style.backgroundColor = '#12001b';
    target.style.color = 'lightgrey'

  }

  button_released(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target.disabled) {
      event.preventDefault(); // Prevent the action if the button is disabled
      return; // Exit early
    }
    target.style.transform = 'scale(1)';
    target.style.backgroundColor = '#2a003f';
    target.style.color = 'white'
  }

}
