import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  // it('should be created', inject([AuthService], (service: AuthService) => {
  //   expect(service).toBeTruthy();
  // }));

  fit('frontend_AuthService_should register a user', inject([AuthService, HttpTestingController], (service: AuthService, httpMock: HttpTestingController) => {
    const mockUser = { userName: 'testuser', password: 'testpassword', email: 'test@example.com', role: 'ADMIN' };

    service['register'](mockUser).subscribe(response => {
      expect(response).toBeTruthy();
      expect(req.request.body).toEqual(mockUser);

      // Add more assertions based on your API response
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Mock successful response
  }));

  fit('frontend_AuthService_should login a user', inject([AuthService, HttpTestingController], (service: AuthService, httpMock: HttpTestingController) => {
    const mockCredentials = { userName: 'testuser', pasword: 'testpassword' };

    service['login'](mockCredentials).subscribe(response => {
      expect(response).toBeTruthy();
      expect(req.request.body).toEqual(mockCredentials);

      // Add more assertions based on your API response
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Mock successful response
  }));
});
