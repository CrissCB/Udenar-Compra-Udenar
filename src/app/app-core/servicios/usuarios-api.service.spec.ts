import { TestBed } from '@angular/core/testing';

import { UsuariosApiService } from './usuarios-api.service';

describe('UsuariosApiService', () => {
  let service: UsuariosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
