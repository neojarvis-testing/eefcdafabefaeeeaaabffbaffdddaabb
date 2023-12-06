import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { SorryComponent } from './components/sorry/sorry.component';
import { OrgdashComponent } from './components/orgdash/orgdash.component';
import { OthGuard } from './guards/oth.guard';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AddEventComponent } from './components/Event/add-event/add-event.component';
import { EditEventComponent } from './components/Event/edit-event/edit-event.component';
import { GetEventComponent } from './components/Event/get-event/get-event.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AddvenueComponent } from './components/Venue/addvenue/addvenue.component';
import { GetvenuesComponent } from './components/Venue/getvenues/getvenues.component';
import { OrgNavComponent } from './components/org-nav/org-nav.component';
import { AddBookingComponent } from './components/Booking/add-booking/add-booking.component';
import { ViewBookingsComponent } from './components/Booking/view-bookings/view-bookings.component';
import { AllBookingsComponent } from './components/Booking/all-bookings/all-bookings.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { PaymentTwentyComponent } from './components/payment-twenty/payment-twenty.component';
import { PaymentEightyComponent } from './components/payment-eighty/payment-eighty.component';
import { ViewPaymentHistoryComponent } from './components/view-payment-history/view-payment-history.component';
import { EditvenueComponent } from './components/Venue/editvenue/editvenue.component';
import { CancelBookingComponent } from './components/cancel-booking/cancel-booking.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]}, //
  {path:'orgdash', component:OrgdashComponent, canActivate:[OthGuard]},
  {path:'forget', component:ForgetpasswordComponent},
  {path:'reset', component:ResetpasswordComponent},
  {path:'sorry', component:SorryComponent},
  {path:'adminNav', component:AdminNavComponent, canActivate:[AuthGuard]}, //
  {path:'orgNav', component:OrgNavComponent, canActivate:[OthGuard]},


  //BookingsCRUD
  {path:'addBooking', component:AddBookingComponent, canActivate:[OthGuard]},
  {path:'viewBookings', component:ViewBookingsComponent, canActivate:[OthGuard]},
  {path:'allBookings', component:AllBookingsComponent, canActivate:[AuthGuard]},
  {path:'cancel/:eventType/:bookingStatus/:bookingID',component:CancelBookingComponent, canActivate:[OthGuard]},


  //EventsCRUD

  {path:'AddEvent',component:AddEventComponent, canActivate:[AuthGuard]}, //
  {path:'EditEvent/:eventId',component:EditEventComponent, canActivate:[AuthGuard]}, //
  {path:'EventGet',component:GetEventComponent, canActivate:[AuthGuard]}, //


  //Payments
  {path:'twenty/:eventType/:bookingID',component:PaymentTwentyComponent, canActivate:[OthGuard]},
  {path:'eighty/:eventType/:bookingID',component:PaymentEightyComponent, canActivate:[OthGuard]},
  {path:'viewPayment',component:ViewPaymentHistoryComponent, canActivate:[]},

//VenuesCRUD
  {path:'AddVenue', component:AddvenueComponent, canActivate:[AuthGuard]}, //
  {path:'VenueGet',component:GetvenuesComponent, canActivate:[AuthGuard]}, //
  {path:'EditVenue/:venueId',component:EditvenueComponent,canActivate:[AuthGuard]},
  {path:'**', component:SorryComponent} //
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
