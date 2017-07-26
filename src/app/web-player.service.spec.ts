import { TestBed, inject } from '@angular/core/testing';

import { WebPlayerService } from './web-player.service';

describe('WebPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebPlayerService]
    });
  });

  it('should be created', inject([WebPlayerService], (service: WebPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
