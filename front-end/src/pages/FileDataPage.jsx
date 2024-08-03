import React from "react";
import { useStore } from "../../store";

const FileDataPage = () => {
  const tableData = useStore((store) => store.fileData);

  const customerName = "Customer Name";
  const date = "Date";
  const itemDesc = "Item Description";
  const itemPrice = "Item Price";
  const itemQuantity = "Item Quantity";
  const itemTotal = "Item Total";
  const totalAmount = "Total Amount";
  const invoiceNo = "Invoice Number";
  const errors = "Errors";

  return tableData.length !== 0 ? (
    <div className="p-4 h-screen w-screen bg-gray-900 flex items-center justify-center">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="py-1 px-2 text-left border-b border-gray-600">
                Invoice Number
              </th>
              <th className="py-1 px-2 text-left border-b border-gray-600">
                Customer Name
              </th>
              <th className="py-1 px-2 text-left border-b border-gray-600">
                Date
              </th>
              <th className="py-1 px-2 text-left border-b border-gray-600">
                Item Description
              </th>
              <th className="py-1 px-2 text-left border-b border-gray-600">
                Item Price
              </th>
              <th className="py-1 px-2 text-left border-b border-gray-600">
                Item Quantity
              </th>
              <th className="py-1 px-2 text-left border-b border-gray-600">
                Item Total
              </th>
              <th className="py-1 px-2 text-left border-b border-gray-600">
                Total Amount
              </th>
              {tableData[0][errors] && (
                <th className="py-1 px-2 text-left border-b border-gray-600">
                  Errors
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => {
              return (
                <tr
                  key={index}
                  className={`hover:bg-gray-700 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                  }`}
                >
                  <td className="py-2 px-2 border-b border-gray-700 text-gray-200">
                    {row[invoiceNo]}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-700 text-gray-200">
                    {row[customerName]}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-700 text-gray-200">
                    {row[date]}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-700 text-gray-200">
                    {row[itemDesc]}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-700 text-gray-200">
                    {row[itemPrice]}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-700 text-gray-200">
                    {row[itemQuantity]}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-700 text-gray-200">
                    {row[itemTotal]}
                  </td>
                  <td className="py-2 px-2 border-b border-gray-700 text-gray-200">
                    {row[totalAmount]}
                  </td>
                  {row[errors] && (
                    <td className="py-2 px-2 border-b border-gray-700 text-gray-200">
                      {row[errors]}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-300">
      Data of the uploaded file will be displayed here
    </div>
  );
};

export default FileDataPage;
