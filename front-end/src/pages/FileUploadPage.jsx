import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store.js";

const FileUploadPage = () => {
  const serverURL = "http://localhost:4001";

  const [file, setFile] = useState();
  const setFileData = useStore((store) => store.setFileData);
  const fileData = useStore((store) => store.fileData);

  const navigate = useNavigate();

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${serverURL}/upload`, formData);
      console.log(response);
      if (response.data.success === true && response.status === 200) {
        setFileData(response.data.data);
        navigate("/invoices");
      } else if (response.data.success === true && response.status === 206) {
        setFileData(response.data.data);
        navigate("/validation-errors");
      }
    } catch (error) {
      console.log("Error while sending file from client to server", error);
    } finally {
      setFile(undefined);
    }
  };

  return (
    <div className="p-4 bg-gray-900 h-screen min-w-96 w-screen flex justify-center items-center">
      <div className="px-4 py-8 h-[28rem] w-96 min-w-80 border-2 border-dashed border-blue-800 rounded-3xl flex flex-col items-center justify-evenly">
        <div>
          <h2 className="text-gray-300 text-center font-semibold text-3xl pb-2">
            Upload your invoice
          </h2>
          <p className="text-gray-300 text-center">Excel or CSV</p>
        </div>

        <label
          htmlFor="browse-files"
          className="px-6 py-2 bg-blue-800 text-white rounded-full cursor-pointer"
        >
          {!file && (
            <>
              <span>Browse Computer</span>
              <input
                id="browse-files"
                type="file"
                name="invoice"
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </>
          )}
          {file && (
            <>
              <button onClick={upload}>Upload ({file.name})</button>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default FileUploadPage;
