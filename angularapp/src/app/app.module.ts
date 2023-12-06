import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SorryComponent } from './components/sorry/sorry.component';
import { OrgdashComponent } from './components/orgdash/orgdash.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { GetEventComponent } from './components/Event/get-event/get-event.component';
import { AddEventComponent } from './components/Event/add-event/add-event.component';
import { EditEventComponent } from './components/Event/edit-event/edit-event.component';
import { DatePipe } from '@angular/common';
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
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule, ToastrService } from 'ngx-toastr';
import { EditvenueComponent } from './components/Venue/editvenue/editvenue.component';
import { CancelBookingComponent } from './components/cancel-booking/cancel-booking.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SorryComponent,
    OrgdashComponent,
    ForgetpasswordComponent,
    GetEventComponent,
    AddEventComponent,
    EditEventComponent,
    AdminNavComponent,
    AddvenueComponent,
    GetvenuesComponent,
    OrgNavComponent,
    AddBookingComponent,
    ViewBookingsComponent,
    AllBookingsComponent,
    ResetpasswordComponent,
    PaymentTwentyComponent,
    PaymentEightyComponent,
    ViewPaymentHistoryComponent,
    EditvenueComponent,
    CancelBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot(),
  ],
  providers: [DatePipe, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
