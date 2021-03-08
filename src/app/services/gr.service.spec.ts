import { TestBed } from '@angular/core/testing';

import { GrService } from './gr.service';

describe('GrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrService = TestBed.get(GrService);
    expect(service).toBeTruthy();
  });
});
