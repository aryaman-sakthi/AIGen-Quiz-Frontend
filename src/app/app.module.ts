import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './pages/menu/menu.component';
import { ImageQuizComponent } from './pages/image-quiz/image-quiz.component';
import { VideoQuizComponent } from './pages/video-quiz/video-quiz.component';
import { SongQuizComponent } from './pages/song-quiz/song-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MenuComponent,
    ImageQuizComponent,
    VideoQuizComponent,
    SongQuizComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
