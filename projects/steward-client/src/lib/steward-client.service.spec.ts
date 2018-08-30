import { TestBed, inject } from '@angular/core/testing';

import { StewardClientService } from './steward-client.service';

describe('StewardClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StewardClientService]
    });
  });

  it('should be created', inject([StewardClientService], (service: StewardClientService) => {
    expect(service).toBeTruthy();
  }));
});
