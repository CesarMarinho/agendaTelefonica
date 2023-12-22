import { TestBed } from '@angular/core/testing';

import { PhoneResolver } from './phone.resolver';

describe('PhoneResolver', () => {
  let resolver: PhoneResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PhoneResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
