const csv = require("csv-parser");
const xlsx = require("xlsx");
const fs = require("fs");

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const fileData = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        if (data.Date.toString().includes("-")) {
          // converting date from "dd-MM-yyyy" to "dd/MM/yyyy"
          data.Date = data.Date.toString().replace(/-/g, "/");
        }
        fileData.push(data);
      })
      .on("end", () => {
        // removing unwanted hidden characters
        const cleanedFileData = fileData.map((row) => {
          const cleanedRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key.trim(), value])
          );
          return cleanedRow;
        });
        resolve(cleanedFileData);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

function convertExcelDate(excelDate) {
  const excelEpoch = new Date(1900, 0, 1);
  const daysOffset = excelDate - 2;
  const date = new Date(
    excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000
  );
  return date;
}

const fileParser = async (filePath) => {
  if (filePath.endsWith(".csv")) {
    return await parseCSV(filePath);
  } else if (filePath.endsWith(".xlsx") || filePath.endsWith(".xls")) {
    const fileData = parseExcel(filePath);
    fileData.forEach((row) => {
      if (typeof row.Date === "number") {
        // converting excel date to JavaScript Date
        row.Date = convertExcelDate(row.Date);
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };

        // Converting JavaScript Date object to dd/MM/yyyy formate
        row.Date = new Intl.DateTimeFormat("en-GB", options).format(row.Date);
      }
    });
    return fileData;
  } else {
    throw new Error("Unsupported File Format");
  }
};

module.exports = fileParser;
