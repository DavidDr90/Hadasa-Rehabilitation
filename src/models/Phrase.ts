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

    public GetName():string {
        return this.name;
    }
    public GetImageURL() :string {
        return this.imageURL;
    }

    public SetName(newName) {
        this.name = newName;
    }

    public SetImageURL(newURL) {
        this.imageURL = newURL;
    }
}
