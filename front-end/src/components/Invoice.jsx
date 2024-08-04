import React from "react";

const Invoice = ({ data }) => {
  return (
    <div className="p-8 bg-gray-900 shadow-lg h-full w-[48rem] text-gray-200 flex flex-col gap-16 justify-between items-center">
      <div className="text-left w-full">
        <h1 className="pb-6 text-5xl font-semibold">
          Invoice #{data["invoiceNumber"]}
        </h1>
        <p className="text-xl">Issue Date: {data["date"]}</p>
        <p className="text-xl">Bill To: {data["customerName"]}</p>
      </div>
      <table className="w-full border">
        <tbody>
          <tr className="text-left">
            <th className="py-1 px-4 w-1/2 border-b border-r">Description</th>
            <th className="py-1 px-4 w-1/6 border-b border-r">Quantity</th>
            <th className="py-1 px-4 w-1/6 border-b border-r">Price</th>
            <th className="py-1 px-4 w-1/6 border-b border-r">Total</th>
          </tr>
          {data["items"].map((item) => {
            return (
              <tr key={`${item["description"]}-${item["quantity"]}`}>
                <td className="py-1 px-4 border-b border-r">
                  {item["description"]}
                </td>
                <td className="py-1 px-4 border-b border-r">
                  {item["quantity"]}
                </td>
                <td className="py-1 px-4 border-b border-r">{item["price"]}</td>
                <td className="py-1 px-4 border-b border-r">{item["total"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full text-2xl text-right font-semibold">
        Total Amount: {data["totalAmount"]}
      </div>
    </div>
  );
};

export default Invoice;
