import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ImageQuizComponent } from './pages/image-quiz/image-quiz.component';
import { VideoQuizComponent } from './pages/video-quiz/video-quiz.component';
import { SongQuizComponent } from './pages/song-quiz/song-quiz.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'menu', component: MenuComponent},
  { path: 'quiz/images', component: ImageQuizComponent},
  { path: 'quiz/videos', component: VideoQuizComponent},
  { path: 'quiz/songs', component: SongQuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
