
export interface Event {
    eventId:number
    eventType:string
    description:string
    package:string
    participantCount:string
    charges:number
    createBy?:string
    createAt?:Date
    modifiedBy?:string
    modifiedAt?:Date
}
