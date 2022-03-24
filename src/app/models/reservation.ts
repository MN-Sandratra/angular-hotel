import { Client } from "./client";
import { Room } from "./room";

export class Reservation {
    id!:number;
    client!:Client;
    room !:Room;
    dateReservation !:Date;
    dateDebut !:Date;
    dateFin !:Date;
    nbrPerson !:number;
}
