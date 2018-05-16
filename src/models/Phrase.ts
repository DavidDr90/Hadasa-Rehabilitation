export class Item{
    public static toObject(item){
        return JSON.parse(JSON.stringify(item));
    }
}


export class Phrase extends Item {

    constructor(public categoryID: string,
                public imageURL:string,
                public name: string,
                public voiceURL: string,
                public id: string
                ) {
        super()
    }

    get GetName() {
        return this.name;
    }
    get GetImageURL() {
        return this.imageURL;
    }

    public SetName(newName) {
        this.name = newName;
    }

    public SetImageURL(newURL) {
        this.imageURL = newURL;
    }
}
