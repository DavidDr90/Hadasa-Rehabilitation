export class Item {
    public static toObject(item) {
        return JSON.parse(JSON.stringify(item));
    }
}

export class Category extends Item {

    constructor(public name: string, //the hebrew name of the category
        public id: string, //the ID of the category on the DB
        public imageURL: string, //the image url of the category
        private userEmail: string, //the email of the user that have this category
        private parentCategoryID: string, //if not NULL, the ID of the parent category of this sub category
        private views: number, //the number of the times the user clicked the category
        private isFav: boolean// TRUE if this category is one of the user selected favorite categories. else, FALSE.
    ) {
        super()
    }


    //GETTERS
    public getName() {
        return this.name;
    }
    public getID(): string {
        return this.id;
    }
    public getImage() {
        return this.imageURL;
    }
    public getUserEmail() {
        return this.userEmail;
    }
    public getParentCategoryID() {
        return this.parentCategoryID;
    }
    public getViews() {
        return this.views;
    }
    public getIsFav(): boolean {
        return this.isFav;
    }

    public getParentCategoryId() {
        return this.parentCategoryID;
    }

    //SETTERS
    public setName(t: string) {
        this.name = t;
    }
    public setUrl(u: string) {
        this.imageURL = u;
    }
    public setID(id: string) {
        this.id = id;
    }
    public setUserEmail(email: string) {
        this.userEmail = email;
    }
    public setParentCategoryID(categoryParent: string) {
        this.parentCategoryID = categoryParent;
    }
    public setIsFav(isFav: boolean) {
        this.isFav = isFav;
    }

    //each time a category has chosen, her views increase by 1.
    public increaseViews() {
        this.views++;
    }

    public toString(): string {
        return "category: \n" +
            "name: " + this.getName + "\n" +
            "id: " + this.getID + "\n" +
            "imageURL: " + this.imageURL + "\n" +
            "userEmail: " + this.getUserEmail + "\n" +
            "parentCategoryID: " + this.getParentCategoryId + "\n" +
            "views: " + this.getViews + "\n" +
            "isFav: " + this.getIsFav + "\n";
    }

}

