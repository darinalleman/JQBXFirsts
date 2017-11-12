import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopResultsComponent } from './search-top-results.component';

describe('SearchTopResultsComponent', () => {
  let component: SearchTopResultsComponent;
  let fixture: ComponentFixture<SearchTopResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTopResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
