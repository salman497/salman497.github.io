import { TestBed } from '@angular/core/testing';

import { PluginsLoaderService } from './plugins-loader.service';

describe('PluginsLoaderService', () => {
  let service: PluginsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
