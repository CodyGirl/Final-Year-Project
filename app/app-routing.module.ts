import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import {LoginComponent} from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import {CardDeckComponent } from './card-deck/card-deck.component';
import { MovieRecommendationsComponent } from './movieRecommendations/movieRecommendations.component';
import { MusicRecommendationsComponent } from './music-recommendations/music-recommendations.component';
import { JobRecommendationsComponent } from './jobRecommendations/jobRecommendations.component';
import { BookRecommendationsComponent } from './bookRecommendations/bookRecommendations.component';
import { DelineateComponent } from './delineate/delineate.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
const routes: Routes = [
  { path: '', component: LayoutComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cardDeck', component: CardDeckComponent },
  { path: 'movie', component: MovieRecommendationsComponent, canActivate: [AuthGuard] },
  { path: 'music', component: MusicRecommendationsComponent, canActivate: [AuthGuard] },
  { path: 'job', component: JobRecommendationsComponent, canActivate: [AuthGuard] },
  { path: 'book', component: BookRecommendationsComponent, canActivate: [AuthGuard] },
  { path: 'delineate', component: DelineateComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LayoutComponent, LoginComponent, RegisterComponent, 
  CardDeckComponent, 
  MovieRecommendationsComponent, 
  MusicRecommendationsComponent,
  JobRecommendationsComponent,
  BookRecommendationsComponent,
  DelineateComponent,
  ErrorComponent
];
