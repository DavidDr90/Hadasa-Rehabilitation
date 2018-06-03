export class Item {
    public static toObject(item) {
        return JSON.parse(JSON.stringify(item));
    }
}

export class Category extends Item {

    constructor(public name: string, //the hebrew name of the category
        public id: string, //the ID of the category on the DB
        public imageURL: string, //the image url of the category
        public userEmail: string, //the email of the user that have this category
        public parentCategoryID: string, //if not NULL, the ID of the parent category of this sub category
        public views: number, //the number of the times the user clicked the category
        public isFav: boolean,// TRUE if this category is one of the user selected favorite categories. else, FALSE.
        public order:number//the # of the category in the list
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

