import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedArtistsComponent } from './related-artists.component';

describe('RelatedArtistsComponent', () => {
  let component: RelatedArtistsComponent;
  let fixture: ComponentFixture<RelatedArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedArtistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
