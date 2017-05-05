import $ from 'jquery';
import {
  load as loadTemplate
} from 'templates';

const $appContainer = $('#app-container');

const sampleData = {
  "issuer": "Testing Issuer",
  "receiver": "Testing Receiver",
  "inv-number": "00000666",
  "inv-date-issued": "02.01.2017",
  "inv-date-sale": "01.01.2017",
  "inv-sale-list": [{
      "id": "59-023",
      "item-name": "A test item name",
      "item-unit": "no",
      "item-quantity": "1",
      "item-unit-price": "4.40"
    },
    {
      "id": "59-100",
      "item-name": "Another test item name",
      "item-unit": "no",
      "item-quantity": "2",
      "item-unit-price": "1.25"
    },
    {
      "id": "55-777",
      "item-name": "Yet another test item name",
      "item-unit": "no",
      "item-quantity": "5",
      "item-unit-price": "0.70"
    }
  ]
};

class InvoiceController {
  get() {
    Promise.all([
        loadTemplate('invoice'),
        sampleData
      ])
      .then(([template, sampleData]) => {

        $appContainer.html(template(sampleData));
      });
  }
}

export default new InvoiceController();
