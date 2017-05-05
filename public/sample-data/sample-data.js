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
        "item-unit": "number",
        "item-quantity": "1",
        "item-unit-price": "999.99",
        "item-total-price": "999.99"
      },
      {
        "item-id": "59-021",
        "item-name": "Sting, an unique sword",
        "item-unit": "number",
        "item-quantity": "1",
        "item-unit-price": "72.50",
        "item-total-price": "72.50"
      },
      {
        "item-id": "59-024",
        "item-name": "Mithril chainmail",
        "item-unit": "number",
        "item-quantity": "1",
        "item-unit-price": "122.49",
        "item-total-price": "122.49"
      }
    ]
  },
  "sample2": {
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
        "item-unit": "number",
        "item-quantity": "1",
        "item-unit-price": "999.99",
        "item-total-price": "999.99"
      },
      {
        "item-id": "59-021",
        "item-name": "Sting, an unique sword",
        "item-unit": "number",
        "item-quantity": "1",
        "item-unit-price": "72.50",
        "item-total-price": "72.50"
      },
      {
        "item-id": "59-024",
        "item-name": "Mithril chainmail",
        "item-unit": "number",
        "item-quantity": "1",
        "item-unit-price": "122.49",
        "item-total-price": "122.49"
      }
    ]
  }
};

export { sampleData };
