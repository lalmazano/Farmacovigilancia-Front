import { TestBed } from '@angular/core/testing';

import { EnrcryptService } from './enrcrypt.service';

describe('EnrcryptService', () => {
  let service: EnrcryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrcryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
