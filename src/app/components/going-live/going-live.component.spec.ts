import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoingLiveComponent } from './going-live.component';

describe('GoingLiveComponent', () => {
  let component: GoingLiveComponent;
  let fixture: ComponentFixture<GoingLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoingLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoingLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
