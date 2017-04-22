class Entity {
    constructor(
        name,
        address,
        idNumber, //EGN or EIK
        vATRegistered,
        authorizedPerson,
        recipients,
    ) {
        this._name = name;
        this._address = address;
        this._idNumber = idNumber;

        this._vATNumber = vATRegistered ? 'BG' + idNumber : null;

        this._authorisedPerson = authorizedPerson;

        if (recipients) {
            this._recipients = recipients;
        }
        else {
            this._recipients = [];
            this._recipients.push(this.authorizedPerson);
        }
    }

    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get idNumber() {
        return this._idNumber;
    }

    get vATNumber() {
        return this._vATNumber;
    }

    get authorizedPerson() {
        return this._authorisedPerson;
    }

    get recipients() {
        return this._recipients;
    }
}