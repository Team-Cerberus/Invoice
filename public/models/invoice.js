import Entity from 'entity';
import Seller from 'seller';
import InvoiceRow from 'invoiceRow';

class Invoice {
    constructor(number,
        dateOfIssue,
        dateTaxEvent,
        sellerIdNumber,
        buyer,
        invoiceRows,
        transactionLocation,
        //payment,
        //explanation,
        issuer,
        recipient
        ) {

        this._number = number;
        this._dateOfIssue = dateOfIssue;
        this._dateTaxEvent = dateTaxEvent;
        this._sellerIdNumber = sellerIdNumber;
        this._buyer = buyer;

        if (invoiceRows) {
            this._invoiceRows = invoiceRows;
        }
        else {
            this._invoiceRows = [];
        }

        this._transactionLocation = transactionLocation;
        // this._payment = payment;
        // this._explanation = explanation;
        // this._totalVAT = this.invoiceRows.reduce((x, y) => x.rowVAT + y.rowVAT, 0);
        // this._totalNoVAT = this.invoiceRows.reduce((x, y) => x.rowPriceNoVAT + y.rowPriceNoVAT);
        // this._totalWithVAT = this.totalVAT + this.totalNoVAT;
        // this._totalInWords = numberToWords(this.totalWithVAT);
        this._issuer = issuer;
        this._recipient = recipient;
    }

    get number() {
        return this._number;
    }

    get dateOfIssue() {
        return this._dateOfIssue;
    }

    get dateTaxEvent() {
        return this._dateTaxEvent;
    }

    get sellerIdNumber() {
        return this._sellerIdNumber;
    }

    get buyer() {
        return this._buyer;
    }

    get invoiceRows() {
        return this._invoiceRows;
    }

    get transactionLocation() {
        return this._transactionLocation;
    }

    // get payment() {
    //     return this._payment;
    // }

    // get explanation() {
    //     return this._explanation;
    // }

    // get totalVAT() {
    //     return this._totalVAT;
    // }

    // get totalNoVAT() {
    //     return this._totalNoVAT;
    // }

    // get totalWithVAT() {
    //     return this._totalWithVAT;
    // }

    // get totalInWords() {
    //     return this._totalInWords;
    // }

    get issuer() {
        return this._issuer;
    }

    get recipient() {
        return this._recipient;
    }
}

export default new Invoice();