import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';

describe('EventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });
  });

  // it('should be created', inject([EventService], (service: EventService) => {
  //   expect(service).toBeTruthy();
  // }));

  fit('frontend_EventService_should get all events', inject([EventService, HttpTestingController], (service: EventService, httpMock: HttpTestingController) => {
    service['getAllEvents']().subscribe();

    const req = httpMock.expectOne( `${service['apiUrl']}/api/event`);
    expect(req.request.method).toEqual('GET');

    httpMock.verify();
  }));

  fit('frontend_EventService_should add an event', inject([EventService, HttpTestingController], (service: EventService, httpMock: HttpTestingController) => {
    const mockEvent = {
      eventType: 'Test Event',
      description: 'This is a test event',
      package: 'Basic',
      maxParticipantsCount: '10',
      charges: 100
    };

    service['addEvent'](mockEvent).subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/api/event`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockEvent);

    httpMock.verify();
  }));

  fit('frontend_EventService_should add an event with authorization', inject([EventService, HttpTestingController], (service: EventService, httpMock: HttpTestingController) => {
    const mockEvent = {
      eventType: 'Test Event',
      description: 'This is a test event',
      package: 'Basic',
      maxParticipantsCount: '10',
      charges: 100
    };

    service['addEvent'](mockEvent).subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/api/event`);
    expect(req.request.headers.has('Authorization')).toBeTruthy();

    httpMock.verify();
  }));

  fit('frontend_EventService_should delete an event', inject([EventService, HttpTestingController], (service: EventService, httpMock: HttpTestingController) => {
    const eventId = 1;

    service['deleteEvent'](eventId).subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/api/event/${eventId}`);
    expect(req.request.method).toEqual('DELETE');

    httpMock.verify();
  }));

  fit('frontend_EventService_should delete an event with authorization', inject([EventService, HttpTestingController], (service: EventService, httpMock: HttpTestingController) => {
    const eventId = 1;

    service['deleteEvent'](eventId).subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/api/event/${eventId}`);
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    httpMock.verify();
  }));
});
