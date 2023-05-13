export class commUser {
    //creating this constructor for testing purposes
    constructor(email,name,pronouns)
    {
        //console.log("Creating object...");
        this.email = email;
        this.name = name;
        this.pronouns = pronouns;
    }

    //java-style getters
    getEmail()
    {
        return this._email;
    }
    getName()
    {
        return this._name;
    }
    getPronouns()
    {
        return this._pronouns;
    }
   

}
