import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRecommendationsComponent } from './jobRecommendations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { AgGridModule } from 'ag-grid-angular';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule } from '@angular/forms';

describe('JobRecommendationsComponent', () => {
  let component: JobRecommendationsComponent;
  let fixture: ComponentFixture<JobRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule,Ng4LoadingSpinnerModule, AgGridModule.withComponents([]), FormsModule],
        providers: [AuthService],
        declarations: [ JobRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create JobRecommendationsComponent', () => {
    expect(component).toBeTruthy();
  });
});
