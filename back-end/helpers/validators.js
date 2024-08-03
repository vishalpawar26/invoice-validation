const moment = require("moment");

const validateFileData = (data) => {
  const errors = [];
  const map = new Map();

  data.map((row) => {
    const errorMessage = [];
    const requiredFields = [
      "Invoice Number",
      "Date",
      "Customer Name",
      "Total Amount",
      "Item Description",
      "Item Quantity",
      "Item Price",
      "Item Total",
    ];

    // checking for required data
    requiredFields.forEach((field) => {
      if (!row[field]) {
        errorMessage.push(`"${field}" is required`);
      }
    });

    // validating data
    if (row["Date"] && !moment(row["Date"], "DD/MM/YYYY", true).isValid()) {
      errorMessage.push(`Invalid date "${row["Date"]}"`);
    }

    // validating numbers
    ["Total Amount", "Item Quantity", "Item Price", "Item Total"].forEach(
      (field) => {
        if (row[field] && isNaN(Number(row[field]))) {
          errorMessage.push(`"${row[field]}" must be a valid number`);
        }
      }
    );

    // validate duplicate invoice numbers
    const uniqueIdentifier = `${row["Customer Name"]}-${row["Date"]}`;
    const invoiceNumber = row["Invoice Number"];
    if (!map.has(invoiceNumber)) {
      map.set(invoiceNumber, new Set());
    }

    map.get(invoiceNumber).add(uniqueIdentifier);

    for (const [invoiceNumber, uniqueEntries] of map.entries()) {
      if (uniqueEntries.size > 1) {
        errorMessage.push(`Duplicate invoice number: ${invoiceNumber}`);
      }
    }

    if (errorMessage.length > 0) {
      row["Errors"] = errorMessage.join(", ");
      errors.push(row);
    }
  });

  return errors;
};

module.exports = validateFileData;
