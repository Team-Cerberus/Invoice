import $ from 'jquery';
import { load as loadTemplate } from 'templates';
import Entity from 'entity';
import Seller from 'seller';
import InvoiceRow from 'invoiceRow';
import Invoice from 'invoice';
import { invoiceData } from 'data';
import toastr from 'toastr';
import { userData } from 'data';

const $appContainer = $('#app-container');

class InvoiceController {
	getInvoice() {
		Promise.all([
			loadTemplate('invoice'),
			userData.getUserDetails()
		])
			.then(([companiesTemplate, userDetails]) => {
				$appContainer.html(companiesTemplate(userDetails.result));
		});
	}
		
  get(invoiceNumber) {

    Promise.all([
      loadTemplate('invoice'),
      userData.getInvoiceDetails()
    ])
      .then(([template, invoiceDetails]) => {
		  console.log(invoiceDetails);
        $appContainer.html(invoiceDetails.resullt);
      });
  }

  addInvoiceRow() {
    const $newInvoiceRow = $('.invoice-row').first().clone();
    $newInvoiceRow.children().val('');
    $('.invoice-rows').append($newInvoiceRow);
    location.hash = '#/empty';
    //location.hash = '#/invoice/addrow';
  }

  post() {
    const newSellerId = $('#sellerIdNumber');

    const newSeller = new Seller(
      $('#sellerName').val(),
      $('#sellerAddress').val(),
      $('#sellerCity').val(),
      $('#sellerZip').val(),
      newSellerId,
    );
    const newBuyer = new Entity(
      $('#buyerName').val(),
      $('#buyerAddress').val(),
      $('#buyerCity').val(),
      $('#buyerZip').val(),
      $('#buyerIdNumber').val()
    );

    const newInvoiceRows = [];
    $('.invoice-row')
      .toArray()
      .forEach(
      ($invoiceRow) => {
        const newInvoiceRow = new InvoiceRow(
          $invoiceRow.find('.product-id').val(),
          $invoiceRow.find('.product-name').val(),
          $invoiceRow.find('.product-unit').val(),
          $invoiceRow.find('.product-quantity').val(),
          $invoiceRow.find('.product-unit-price').val(),
          $invoiceRow.find('.product-total-price').val(),
        );
        newInvoiceRows.push(newInvoiceRow);
      }
      );

    const newInvoice = new Invoice(
      $('#documentId').val(),
      $('#documentDateIssued').val(),
      $('#documentDateSale').val(),
      newSellerId,
      newBuyer,
      newInvoiceRows,
      $('#documentPlaceSale').val(),
      $('#issuer').val(),
      $('#recipient').val()
    );
    invoiceData.invoiceAdd(newInvoice)
      .then((invoice) => {
        location.href = '#/invoice';
        toastr.success(`${invoice.number} was added successfully!`);
      }).catch(error => toastr.error(error.responseText));
  }
}

export default new InvoiceController();
