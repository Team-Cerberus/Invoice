import $ from 'jquery';
import { load as loadTemplate } from 'templates';
import { sampleData } from 'devDataContainer';

const $appContainer = $('#app-container');

class InvoiceController {
  get(params) {
    let { id } = params;
    let invoiceInstance = sampleData[id];

    Promise.all([
        loadTemplate('invoice'),
        invoiceInstance
      ])
      .then(([template, invoiceInstance]) => {

        $appContainer.html(template(invoiceInstance));
      });
  }
}

export default new InvoiceController();
