# Invoice Upload and Validation Service

The Invoice Upload and Validation Service is a Node.js and React.js application that allows users to upload CSV or Excel files containing invoice data. The service validates the uploaded data, identifies errors, and converts valid invoices into a JSON structure to display at the front end.

## Features

- **File Upload:** Supports both CSV and Excel file formats.
- **Data Validation:** Ensures invoice data meets required standards with detailed error reporting.
- **JSON Conversion:** Converts valid invoices into a structured JSON format.
- **Error Handling:** Handles errors throughout the process with descriptive messages.
- **Front-End Display:** Visual representation of valid invoices in a formatted invoice layout and detailed error reporting for invalid rows.

## Setup and Run Instructions

### Prerequisites

- **Node.js:** Ensure you have Node.js installed (version 12 or later).
- **NPM:** Node Package Manager is required for installing dependencies.

### Installation
1. **Clone the Respository:**
   ```bash
   git clone https://github.com/vishalpawar26/invoice-validation.git
   cd invoice-validation
   
2. **Install Dependencies:**
   ```bash
   cd front-end
   npm install
   cd ..
   cd back-end
   npm install

### Running the Application
1. **Start the Server:**
   ```bash
   npm test
- The server will run on http://localhost:4001
2. **Run the React App:**
   ```bash
   npm run dev

### Upload an Invoice File
There are two ways of uploading an invoice file,
1. **Using User Interface:**
   - Click on the "Browse Computer" button to select a file
   - Click on the "Upload" button to upload the file to the server
2. **Using a tool like Postman or cURL:**
   - Send a POST request to http://localhost:4001/upload
   - Example request with cURL:
     ```bash
     curl -X POST http://localhost:4001/upload -F 'file=@path/to/your/invoice.csv'

## Error Reporting
For rows with errors, the application displays the specific errors alongside the problematic rows in a table format. This allows users to easily identify and correct issues.

### Example Error Report
![Example Error Report](https://github.com/vishalpawar26/invoice-validation/blob/main/example-images/Screenshot%202024-08-04%20101958.png)

## JSON Structure
Valid invoices are converted into the following JSON structure:
```bash
[
  {
    "invoiceNumber": "INV001",
    "date": "08/01/2024",
    "customerName": "John Doe",
    "totalAmount": 100.00,
    "items": [
      {
        "description": "Item 1",
        "quantity": 2,
        "price": 50.00,
        "total": 100.00
      }
    ]
  },
  ...
]
```

### JSON Fields
- invoiceNumber: Unique identifier for the invoice.
- date: Date of the invoice.
- customerName: Name of the customer.
- totalAmount: Total amount for the invoice.
- items: List of items in the invoice, each containing:
  - description: Description of the item.
  - quantity: Quantity of the item.
  - price: Price per unit of the item.
  - total: Total price for the item (quantity * price).

### Example Valid Invoice
![Example Invoice](https://github.com/vishalpawar26/invoice-validation/blob/main/example-images/Screenshot%202024-08-04%20102901.png)

## Assumptions & Design Dicisions
1. **File Format Support:** The service supports CSV and Excel formats (.csv, .xlsx, .xls), assuming these are the most common formats for invoice data.
2. **Date Format:** We assume all dates in the input files are in the DD/MM/YYYY format, as it is a common Indian standard.
3. **Numeric Validation:** All numeric fields are validated to be proper numbers, considering potential decimals.
4. **Unique Invoice Numbers:** Each invoice number must be unique in the provided file, preventing duplicate entries.
5. **Error Reporting:** Instead of stopping at the first error, the service validates all rows and returns a comprehensive list of errors to the user, enabling easier correction.
6. **Mock Service Call:** Invoices are printed to the console instead of being saved to a database, simulating service call behavior. This can be extended to actual database operations or external service calls as needed.
7. **Front-End Display:** The decision to implement a front-end display ensures users can easily visualize their invoice data and identify errors, providing a user-friendly experience.
