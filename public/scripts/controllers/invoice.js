import $ from 'jquery';
import { load as loadTemplate } from 'templates';
import { sampleData } from 'devDataContainer';
import Entity from 'entity';
import Seller from 'seller';
import InvoiceRow from 'invoiceRow';
import Invoice from 'invoice';
import { userData } from 'data';
import toastr from 'toastr';



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

  postSeller() {
    const newSeller = new Seller(
      $('#sellerName').val(),
      $('#sellerAddress').val(),
      $('#sellerCity').val(),
      $('#sellerZip').val(),
      newSellerId,
    );

  }

  postInvoice() {
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

    const $invoiceRow = $('.invoice-row');

    for(let i=0; i<$invoiceRow.length; i+=1) {
        let productId = $invoiceRow.find('.product-id').val();
        let newInvoiceRow = new InvoiceRow(
          productId,
          $invoiceRow.find('.product-name').val(),
          $invoiceRow.find('.product-unit').val(),
          $invoiceRow.find('.product-quantity').val(),
          $invoiceRow.find('.product-unit-price').val(),
          $invoiceRow.find('.product-total-price').val(),
        );

        newInvoiceRows.push(newInvoiceRow);     
    }

    // $('.invoice-row')
    //   .toArray()
    //   .forEach(
    //   (invoiceRow) => {
    //     Console.log($(invoiceRow));
    //     const newInvoiceRow = new InvoiceRow(
    //       $(invoiceRow).find('.product-id').val(),
    //       $invoiceRow.find('.product-name').val(),
    //       $invoiceRow.find('.product-unit').val(),
    //       $invoiceRow.find('.product-quantity').val(),
    //       $invoiceRow.find('.product-unit-price').val(),
    //       $invoiceRow.find('.product-total-price').val(),
    //     );
    //     newInvoiceRows.push(newInvoiceRow);
    //   }
    //   );

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

    userData.invoiceAdd(newInvoice)
      .then((invoice) => {
        //location.href = '#/invoice';
        toastr.success(`${invoice.number} was added successfully!`);
      }).catch(error => toastr.error(error.responseText));
  }
}

export default new InvoiceController();
