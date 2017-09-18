import { TestBed, inject } from '@angular/core/testing';

import { EditPlayListService } from './edit-play-list-service';

describe('EditPlayListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditPlayListService]
    });
  });

  it('should be created', inject([EditPlayListService], (service: EditPlayListService) => {
    expect(service).toBeTruthy();
  }));
});
