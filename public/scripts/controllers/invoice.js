import $ from 'jquery';
import { load as loadTemplate } from 'templates';
import { sampleData } from 'devDataContainer';

const $appContainer = $('#app-container');

class InvoiceController {
  get(invoiceNumber) {
    //let { id } = params;
    let invoiceInstance; // = sampleData[id];   TODO: get invoice from the database

    Promise.all([
        loadTemplate('invoice'),
        invoiceInstance
      ])
      .then(([template, invoiceInstance]) => {
        $appContainer.html(template(invoiceInstance));
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
    //const newSeller = new Seller()
    //const newInvoice = new Invoice(

    //);
  }
}

export default new InvoiceController();
