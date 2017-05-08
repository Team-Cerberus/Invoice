class InvoiceRow {

    constructor(
        productNumber,
        productName,
        measuringUnit,
        quantity,
        unitPrice,
        VATValue,
    ) {
        this._productNumber = productNumber;
        this._productName = productName;
        this._measuringUnit = measuringUnit;
        this._quantity = quantity;
        this._unitPrice = unitPrice;

        this._unitPriceWithVAT += this.unitPrice * VATValue;
        this._rowPriceNoVAT = this.quantity * this.unitPrice;
        this._rowVAT = this._rowPriceNoVAT * VATValue;
        this._rowPriceWithVAT = this._rowPriceNoVAT + this._rowVAT;
    }

    get productNumber() {
        return this._productNumber;
    }

    get productName() {
        return this._productName;
    }

    get measuringUnit() {
        return this._measuringUnit;
    }

    get quantity() {
        return this._quantity;
    }

    get unitPrice(){
        return this._unitPrice;
    }

    get unitPriceWithVAT() {
        return this._unitPriceWithVAT;
    }

    get rowPriceNoVAT() {
        return this._rowPriceNoVAT;
    }

    get rowVAT() {
        return this._rowVAT;
    }

    get rowPriceWithVAT() {
        return this._rowPriceWithVAT;
    }
}