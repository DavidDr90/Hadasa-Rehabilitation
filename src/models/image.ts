import { Item } from "./SmallClass";


export class Image extends Item{
    // { url: string, title?: string, description?: string, category?: string[] }[]
    constructor(
        public url : string = "", 
        public title: string = "",
        public description: string = "",
        public category: string[] = []
    ){
        super()
    }
}