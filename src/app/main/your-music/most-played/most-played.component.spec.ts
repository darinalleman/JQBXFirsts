import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPlayedComponent } from './most-played.component';

describe('MostPlayedComponent', () => {
  let component: MostPlayedComponent;
  let fixture: ComponentFixture<MostPlayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostPlayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
