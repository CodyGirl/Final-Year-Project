import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeckComponent } from './card-deck.component';

describe('CardDeckComponent', () => {
  let component: CardDeckComponent;
  let fixture: ComponentFixture<CardDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CardDeckComponent', () => {
    expect(component).toBeTruthy();
  });
});
