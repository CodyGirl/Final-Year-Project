import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { RegisterComponent, RegisterAlert, TwitterAlert } from './register/register.component';
import { HeaderComponent, DialogOverviewExampleDialog } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent, LoginAlert} from './login/login.component';
import { CardDeckComponent } from './card-deck/card-deck.component';
import { FooterComponent } from './footer/footer.component';
import { MatNativeDateModule} from '@angular/material';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { JobAlert, JobTwitterAlert } from './jobRecommendations/jobRecommendations.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import 'ag-grid-enterprise';
import { MovieRecommendationsComponent, MovieAlert, MovieTwitterAlert } from './movieRecommendations/movieRecommendations.component';
import { MusicRecommendationsComponent, MusicAlert, MusicTwitterAlert } from './music-recommendations/music-recommendations.component';
import { BookRecommendationsComponent, BookAlert, BookTwitterAlert } from './bookRecommendations/bookRecommendations.component';
import { DelineateComponent, DelineateAlert, DelineateTwitterAlert } from './delineate/delineate.component';
import { ContactComponent } from './contact/contact.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { ErrorComponent } from './error/error.component';

@NgModule({
  entryComponents: [JobAlert, MusicAlert, MusicTwitterAlert, MovieAlert, MovieTwitterAlert, DelineateAlert, DelineateTwitterAlert, JobTwitterAlert, DialogOverviewExampleDialog, BookAlert, BookTwitterAlert, RegisterAlert, TwitterAlert, LoginAlert],
  declarations: [AppComponent, MusicAlert, MusicTwitterAlert, MovieAlert, MovieTwitterAlert, DelineateAlert, DelineateTwitterAlert, JobTwitterAlert, JobAlert, BookAlert, LoginAlert, RegisterAlert, BookTwitterAlert, TwitterAlert, CardDeckComponent, DialogOverviewExampleDialog,FooterComponent,RegisterComponent,LoginComponent, HeaderComponent,LayoutComponent,MovieRecommendationsComponent, routingComponents, MusicRecommendationsComponent, BookRecommendationsComponent, DelineateComponent, ContactComponent, ErrorComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule,  Ng4LoadingSpinnerModule.forRoot(), MatNativeDateModule, ChartsModule, MatProgressBarModule, RouterModule, AppRoutingModule,ReactiveFormsModule, HttpClientModule, AgGridModule.withComponents([]), FormsModule, ShowHidePasswordModule],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);

  