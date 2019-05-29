import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicRecommendationsComponent } from './music-recommendations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { AgGridModule } from 'ag-grid-angular';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule } from '@angular/forms';

describe('MusicRecommendationsComponent', () => {
  let component: MusicRecommendationsComponent;
  let fixture: ComponentFixture<MusicRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule,Ng4LoadingSpinnerModule, AgGridModule.withComponents([]), FormsModule],
        providers: [AuthService],
        declarations: [ MusicRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MusicRecommendationsComponent', () => {
    expect(component).toBeTruthy();
  });
});
