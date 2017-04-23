class Invoice {
    constructor(number,
        dateOfIssue,
        dateTaxEvent,
        seller,
        buyer,
        invoiceRows,
        transactionLocation,
        payment) {

        this._number = number;
        this._dateOfIssue = dateOfIssue;
        this._dateTaxEvent = dateTaxEvent;
        this._seller = seller;
        this._buyer = buyer;
        this._invoiceRows = invoiceRows;
        this._transactionLocation = transactionLocation;
        this._payment = payment;
        this._totalVAT = this.invoiceRows.reduce((x, y) => x.rowVAT + y.rowVAT, 0);
        this._totalNoVAT = this.invoiceRows.reduce((x, y) => x.rowPriceNoVAT + y.rowPriceNoVAT);
        this._totalWithVAT = this.totalVAT + this.totalNoVAT;
        this._totalInWords = numberToWords(this.toalWithVAT);
    }


}