import { TestBed, inject } from '@angular/core/testing';

import { AddSongToPlaylistService } from './add-song-to-playlist.service';

describe('AddSongToPlaylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddSongToPlaylistService]
    });
  });

  it('should be created', inject([AddSongToPlaylistService], (service: AddSongToPlaylistService) => {
    expect(service).toBeTruthy();
  }));
});
