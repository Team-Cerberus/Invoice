const sampleData = {
  "sample1": {
    "document": {
      "document-type": "Invoice",
      "document-is-original": "original",
      "document-number": "00000777",
      "document-date-issued": "02.01.2017",
      "document-date-sale": "01.01.2017",
      "document-place-sale": "Hobbiton, The Shire"
    },
    "issuer": {
      "issuer-name": "Bilbo and Associates Ltd.",
      "issuer-city": "Hobbiton",
      "issuer-address": "15 Grassroute str, Hobbiton, The Shire",
      "issuer-uic": "123456789",
      "issuer-vat": "098765432",
      "issuer-accountable-person": "Frodo Baggins"
    },
    "receiver": {
      "receiver-name": "Magical Jewellery Unlimited Ltd.",
      "receiver-city": "Moria",
      "receiver-address": "15, Grand Hall, Moria",
      "receiver-uic": "999888777",
      "receiver-vat": "123123123",
      "receiver-accountable-person": "Gandalf the Gray"
    },
    "invoice-item-list": [{
        "item-id": "59-001",
        "item-name": "The One Ring",
        "item-unit": "piece",
        "item-quantity": "1",
        "item-unit-price": "999.99",
        "item-total-price": "999.99"
      },
      {
        "item-id": "59-021",
        "item-name": "Sting, an unique sword",
        "item-unit": "piece",
        "item-quantity": "1",
        "item-unit-price": "72.50",
        "item-total-price": "72.50"
      },
      {
        "item-id": "59-024",
        "item-name": "Mithril chainmail",
        "item-unit": "piece",
        "item-quantity": "1",
        "item-unit-price": "122.49",
        "item-total-price": "122.49"
      }
    ]
  },
  "sample2": {
    "document": {
      "document-type": "Invoice",
      "document-is-original": "copy",
      "document-number": "00000666",
      "document-date-issued": "20.04.2017",
      "document-date-sale": "20.04.2017",
      "document-place-sale": "Lorien, Western Rd."
    },
    "issuer": {
      "issuer-name": "Be a Wizard Industries",
      "issuer-city": "Lorien",
      "issuer-address": "Western Rd., Lorien",
      "issuer-uic": "999000999",
      "issuer-vat": "000099900",
      "issuer-accountable-person": "Radagast the Brown"
    },
    "receiver": {
      "receiver-name": "Gandalf the White, wizard",
      "receiver-city": "Rivendell",
      "receiver-address": "1, Elven str.",
      "receiver-uic": "000000001",
      "receiver-vat": "000000022",
      "receiver-accountable-person": "Gandalf the White"
    },
    "invoice-item-list": [
      {
        "item-id": "11202",
        "item-name": "Wizard's Pipe, Oversized",
        "item-unit": "piece",
        "item-quantity": "1",
        "item-unit-price": "999.99",
        "item-total-price": "999.99"
      },
      {
        "item-id": "11001",
        "item-name": "Smokeleaf herb",
        "item-unit": "gram",
        "item-quantity": "100",
        "item-unit-price": "25.50",
        "item-total-price": "2550.00"
      }
                         ]
  }
};

export { sampleData };
