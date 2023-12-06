import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VenueService } from './venue.service';

describe('VenueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VenueService]
    });
  });

  // it('should be created', inject([VenueService], (service: VenueService) => {
  //   expect(service).toBeTruthy();
  // }));

  fit('frontend_VenueService_should add a venue', inject([VenueService, HttpTestingController], (service: VenueService, httpMock: HttpTestingController) => {
    const mockVenue = {
      venueName: 'Test Venue',
      venueLocation: 'Test Location'
    };

    service['addVenue'](mockVenue).subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/api/venue`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockVenue);

    httpMock.verify();
  }));
});
