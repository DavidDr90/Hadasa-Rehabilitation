export class Phrase {

    name: string;
    imageURL: string;

    constructor(name, imageURL) {
        this.imageURL = imageURL;
        this.name = name;
        
    }
    public GetName() {
        return this.name;
    }
    public GetImageURL() {
        return this.imageURL;
    }

    public SetName(newName) {
        this.name = newName;
    }

    public SetImageURL(newURL) {
        this.imageURL = newURL;
    }
}
