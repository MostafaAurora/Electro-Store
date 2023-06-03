import { TestBed } from '@angular/core/testing';

import { ToCartService } from './to-cart.service';

describe('ToCartService', () => {
  let service: ToCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
