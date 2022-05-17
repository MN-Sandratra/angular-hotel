import { Client } from "./client";
import { Room } from "./room";

export class Reservation {
    id!:number;
    client!:Client;
    room !:Room;
    dateReservation !:any;
    dateDebut !:any;
    dateFin !:any;
    nbrPerson !:number;
}
