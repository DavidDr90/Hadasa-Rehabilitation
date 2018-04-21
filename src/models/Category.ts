

export class Category {
    constructor(
        private title: string,
        private url: string
        )
    { }

    public get getTitle(){
            return this.title;
    }
    
    public get getImage(){
        return this.url;
    }
    
    public setTitle(t: string){
        this.title = t;
    }

    public setUrl(u: string){
        this.url = u;
    }


        
  }

