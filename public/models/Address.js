class Address {

    constructor(streetAddress, city, zIP) {
        this._streetAddress = streetAddress;
        this._city = city;
        this._zIP = zIP;
    }

    get streetAddress() {
        return this._streetAddress;
    }

    get city() {
        return this._city;
    }

    get zIP() {
        return this._zIP;
    }
}