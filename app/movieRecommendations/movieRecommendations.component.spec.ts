import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRecommendationsComponent } from './movieRecommendations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { AgGridModule } from 'ag-grid-angular';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule } from '@angular/forms';

describe('MovieRecommendationsComponent', () => {
  let component: MovieRecommendationsComponent;
  let fixture: ComponentFixture<MovieRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule,Ng4LoadingSpinnerModule, AgGridModule.withComponents([]), FormsModule],
        providers: [AuthService],
        declarations: [ MovieRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MovieRecommendationsComponent', () => {
    expect(component).toBeTruthy();
  });
});
