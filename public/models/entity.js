export default class Entity {
    constructor(
        name,
        streetAddress,
        city,
        zIP,
        idNumber,        //EGN or EIK
        // vATRegistered,
        // authorizedPerson,
        // recipients,
    ) {
        this._name = name;
        this._streetAddress = streetAddress;
        this._city = city;
        this._zIP = zIP;
        this._idNumber = idNumber;

        //this._vATNumber = vATRegistered ? 'BG' + idNumber : null;

        //this._authorisedPerson = authorizedPerson;

        // if (recipients) {
        //     this._recipients = recipients;
        // }
        // else {
        //     this._recipients = [];
        //     this._recipients.push(this.authorizedPerson);
        // }
    }

    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get city() {
        return this._city;
    }

    get zIP() {
        return this._zIP;
    }

    get idNumber() {
        return this._idNumber;
    }

    // get vATNumber() {
    //     return this._vATNumber;
    // }

    // get authorizedPerson() {
    //     return this._authorisedPerson;
    // }

    // get recipients() {
    //     return this._recipients;
    // }
}
