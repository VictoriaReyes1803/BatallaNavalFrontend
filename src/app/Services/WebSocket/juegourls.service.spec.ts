import { TestBed } from '@angular/core/testing';

import { JuegourlsService } from './juegourls.service';

describe('JuegourlsService', () => {
  let service: JuegourlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegourlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
