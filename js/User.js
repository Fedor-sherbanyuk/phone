class User {
    #id = null
    name= null
    phone = null
    email = null
    website = null
    constructor({id, name, phone, email, website}) {
        this.#id=id;
        this.name=name;
        this.phone=phone;
        this.email=email;
        this.website=website;
    }

    static isUser(obj) {
        if (obj instanceof User) {
            throw new Error(`${obj} is not user class`)
        }
        console.log(obj +" is good")
       return true;
    }

    get id() {
        return this.#id
    }

    static email(){
        return this.email;
    }

    // your methods
}
