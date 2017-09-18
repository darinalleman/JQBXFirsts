import { TestBed, inject } from '@angular/core/testing';

import { LoadArtistService } from './load-artist.service';

describe('LoadArtistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadArtistService]
    });
  });

  it('should be created', inject([LoadArtistService], (service: LoadArtistService) => {
    expect(service).toBeTruthy();
  }));
});
