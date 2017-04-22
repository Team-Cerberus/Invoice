class InvoiceRow {

    constructor (
        productNumber,
        productName,
        measuringUnit,
        quantity,
        unitPrice,
        VATValue,
    ) {


        this._unitPriceWithVAT += unitPrice*VATValue;
        // others to be added

    }
}