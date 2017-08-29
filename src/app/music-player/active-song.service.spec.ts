import { TestBed, inject } from '@angular/core/testing';

import { ActiveSongService } from './active-song.service';

describe('ActiveSongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveSongService]
    });
  });

  it('should be created', inject([ActiveSongService], (service: ActiveSongService) => {
    expect(service).toBeTruthy();
  }));
});
