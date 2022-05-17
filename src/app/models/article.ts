import { ArticleCat } from "../article-cat";

export class Article {
    id!:number;
    designation!:String;
    unity!:String;
    prix!:number;
    artCat!:ArticleCat;
    quantity!:number;
}
