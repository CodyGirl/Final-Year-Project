import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRecommendationsComponent } from './bookRecommendations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { AgGridModule } from 'ag-grid-angular';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule } from '@angular/forms';

describe('BookRecommendationsComponent', () => {
  let component: BookRecommendationsComponent;
  let fixture: ComponentFixture<BookRecommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule,Ng4LoadingSpinnerModule, AgGridModule.withComponents([]), FormsModule],
        providers: [AuthService],
        declarations: [ BookRecommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BookRecommendationsComponent', () => {
    expect(component).toBeTruthy();
  });
});
