import React from "react";
import { useStore } from "../../store";
import Invoice from "../components/Invoice";

const FileDataPage = () => {
  const invoiceData = useStore((store) => store.fileData);
  return invoiceData.length > 0 ? (
    <div className="p-4 bg-gray-800 flex flex-col gap-4 justify-between items-center">
      {invoiceData.map((invoice) => {
        return <Invoice data={invoice} />;
      })}
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-gray-800 text-gray-300">
      Data of the uploaded file will be displayed here
    </div>
  );
};

export default FileDataPage;
