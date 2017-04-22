class User {        //a lot TODO here

    constructor(
        userName,
        password,
        sellers,
        buyers
    ) {
        this._userName = userName;
        this._password = password;

        if (sellers) {
            this._sellers = sellers;
        }
        else {
            this._sellers = [];
        }
        
        if (buyers) {
            this._buyers = buyers;
        }
        else {
            this._buyers = [];
        }
        
    }
}