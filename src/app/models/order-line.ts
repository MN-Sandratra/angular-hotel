import { NumberLiteralType } from "typescript";
import { Article } from "../article";

export class OrderLine {
    id!:number;
    qtCommander!:number;
    art!:Article;
    price!:number;
    amount!:number;
}
