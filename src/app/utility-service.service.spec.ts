import { TestBed, inject } from '@angular/core/testing';

import { UtilityServiceService } from './utility-service.service';

describe('UtilityServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityServiceService]
    });
  });

  it('should be created', inject([UtilityServiceService], (service: UtilityServiceService) => {
    expect(service).toBeTruthy();
  }));
});
