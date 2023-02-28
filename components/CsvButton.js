import React, { useEffect, useState} from "react";
import { CSVLink } from "react-csv";
const orderDataset = (data, headers) => {
  const reverseDate = (date) => {
    const splitted = new Date(date).toISOString().split("T")
    const reverse = splitted[0].split('-');
    const result=reverse[1]+'/'+reverse[2]+'/'+reverse[0];
    return result;
  }
  const results = headers.map(header => header === 'eventDate' || header === 'surveyCreated' ? reverseDate(data[header.toLowerCase()]) : data[header.toLowerCase()])
  return results;
};

const CsvButton = ({ csvData, fileName}) => {
//   console.log("csv data",csvData)
  const [orderedData, setOrdereData] = useState([]);
  
//   useEffect(() => {
//     const data = csvData.map((dataset) => orderDataset(dataset, headers));
//     setOrdereData(data);
//   }, [csvData]);

  return (
    //use ";" as separator for testing 
    <CSVLink  data={csvData} filename={fileName} separator=",">
      <button  className="small fw-bold bg-black rounded px-3 py-1">
      Download csv
      </button>
    </CSVLink>
  );
};

export default CsvButton;
