import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelineateComponent } from './delineate.component';
import { AuthService } from '../auth.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { ChartsModule } from 'ng2-charts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('DelineateComponent', () => {
  let component: DelineateComponent;
  let fixture: ComponentFixture<DelineateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[RouterTestingModule, BrowserAnimationsModule, Ng4LoadingSpinnerModule, FormsModule, MaterialModule, ChartsModule, HttpClientTestingModule],
        providers:[AuthService],
        declarations: [ DelineateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelineateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DelineateComponent', () => {
    expect(component).toBeTruthy();
  });
});
