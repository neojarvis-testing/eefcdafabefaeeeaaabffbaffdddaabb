import { Booking } from "./booking";
import { User } from "./user";
 
export interface Payment{
    paymentId: number,
    status: string,
    totalAmount: number,
    amountToPay: number,
    paymentDate: Date,
    modeOfPayment: string,
    userId: number,
    user:User
    userName:string
    bookingID:number
    booking:Booking;
    eventType:string;
    // venueDetails:string
 
}