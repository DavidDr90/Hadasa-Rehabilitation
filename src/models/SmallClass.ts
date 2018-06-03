export class Item{
    public static toObject(item){
        return JSON.parse(JSON.stringify(item));
    }
}

export class Color{
    hebrewName: string; 
    englishName: string;
    hexNumber:string;
}

export class Nikud{
    name: string;
    uniCode:string;
    hebrewName: string;
}