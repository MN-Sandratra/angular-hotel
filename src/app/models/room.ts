import { Category } from "./category";

export class Room {
    id!:number;
    number!:number;
    categoryId!:number;
    category!:Category;
    type!:String;
}
