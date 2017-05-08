class Seller extends Entity {

    constructor(
        name,
        streetAddress,
        city,
        zIP,
        idNumber,
        // vATNumber,
        // authorizedPerson,
        // recipients,
        // issuers,
        // bankAccounts,
        // invoices,
    ) {
        super(
            name,
            streetAddress,
            city,
            zIP,
            idNumber,
            // vATNumber,
            // authorizedPerson,
            // recipients,
        );

        // if (issuers) {
        //     this._issuers = issuers;
        // }
        // else {
        //     this._issuers = [];
        //     this._issuers.push(this.authorizedPerson);
        // }

        // this._bankAccounts = bankAccounts;

        this._invoices = [];
    }

    // get issuers() {
    //     return this._issuers;
    // }

    // get bankAccounts() {
    //     return this._bankAccounts;
    // }

    get invoices() {
        return this._invoices;
    }

    addInvoice(invoiceToAdd) {
        //VALIDATION
        this._invoices.push(invoiceToAdd);
    }
}

export default new Seller();