import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService]
    });
  });

  // it('should be created', inject([BookingService], (service: BookingService) => {
  //   expect(service).toBeTruthy();
  // }));

  fit('frontend_BookingService_should get bookings by event ID', inject([BookingService, HttpTestingController], (service: BookingService, httpMock: HttpTestingController) => {
    const eventId = 1;

    service['getBookingsByEventId'](eventId).subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/api/booking/${eventId}`);
    expect(req.request.method).toEqual('GET');

    httpMock.verify();
  }));
});
