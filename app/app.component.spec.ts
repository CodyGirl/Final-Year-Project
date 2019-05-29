import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent,DialogOverviewExampleDialog } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { CardDeckComponent } from './card-deck/card-deck.component';
import { FooterComponent } from './footer/footer.component';
import {MatNativeDateModule} from '@angular/material';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import { MovieRecommendationsComponent } from './movieRecommendations/movieRecommendations.component';
import { MusicRecommendationsComponent } from './music-recommendations/music-recommendations.component';
import { BookRecommendationsComponent } from './bookRecommendations/bookRecommendations.component';
import { DelineateComponent } from './delineate/delineate.component';
import { ContactComponent } from './contact/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JobRecommendationsComponent } from './jobRecommendations/jobRecommendations.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ShowHidePasswordModule, FormsModule, RouterTestingModule, Ng4LoadingSpinnerModule, ReactiveFormsModule, MaterialModule, AgGridModule.withComponents([]),HttpClientTestingModule,ChartsModule],
      providers: [AuthService],
      declarations: [
        AppComponent,
        RegisterComponent,
        HeaderComponent,
        LayoutComponent,
        LoginComponent,
        CardDeckComponent,
        FooterComponent,
        MovieRecommendationsComponent,
        JobRecommendationsComponent,
        MusicRecommendationsComponent,
        BookRecommendationsComponent,
        DelineateComponent,
        ContactComponent
      ],
    }).compileComponents();
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'BigFive'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('BigFive');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to ag-grid-app!');
  // }));

  // afterEach(function() {
  //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  // });
});
