class BankAccount {
    constructor(iBan, bIC, bankName) {
        this._iBan = iBan;
        this._bIC = bIC;
        this._bankName = bankName;
    }

    get iBan() {
        return _iBan;
    }

    get bIC() {
        return _bIC;
    }

    get bankName() {
        return _bankName;
    }
}