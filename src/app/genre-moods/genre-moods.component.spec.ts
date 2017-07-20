import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreMoodsComponent } from './genre-moods.component';

describe('GenreMoodsComponent', () => {
  let component: GenreMoodsComponent;
  let fixture: ComponentFixture<GenreMoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreMoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreMoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
