
export class Client {
    constructor(
        private id: number,
        private name: string
        )
    { }

    public get getId(){
            return this.id;
    }
    
    public get getName(){
        return this.name;
    }

    public setName(n: string){
        this.name = n;
    }


        
  }