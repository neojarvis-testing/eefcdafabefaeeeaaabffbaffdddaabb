import { TestBed, async, inject } from '@angular/core/testing';

import { OthGuard } from './oth.guard';

describe('OthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OthGuard]
    });
  });

  it('should ...', inject([OthGuard], (guard: OthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
