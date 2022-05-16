import { OrderLine } from "../order-line";

export class Order {
    id!:number;
    dateCommande!:Date;
    ordline!:OrderLine;
    state!:string;
}
