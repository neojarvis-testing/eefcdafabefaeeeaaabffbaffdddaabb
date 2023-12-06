
export interface Booking {
    bookingId:number
    userId?:number
    userName?:string
    submissionDate?:Date
    eventDate?:Date
    description?:string
    bookingStatus?:number
    eventType?:string
    venueDetails?:string
    headCount?:number
    amount?:number
    venueId?:number
    eventId?:number
    createBy?:string
    createAt?:Date
    modifiedBy?:string
    modifiedAt?:Date
}
