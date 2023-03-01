import React, { useState, useEffect } from "react";

const MyTable = ({ rows }) => {
  const [headings, setHeadings] = useState([]);
  const [newRows, setNewRows] = useState([]);
  console.log(headings);
  useEffect(() => {
    const keys = [];
    const x = rows.map((row) => {
      Object.keys(row).map((key) =>
        keys.includes(key) ? null : keys.push(key)
      );
    });
    setHeadings(keys);
  }, [rows]);

  useEffect(() => {
    const newRows = rows.map((row) => {
      let obj = {};
      const x = headings.map((head) => {
        Object.defineProperty(obj, head, {
          value: "",
          writable: true,
          enumerable: true,
        });
      });
      Object.assign(obj, row);

      return obj;
    });
    setNewRows(newRows);
  }, [rows, headings]);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover table-success table-bordered border-success table-striped">
          <thead>
            <tr>
              {/* <th scope="col">Date</th> */}
              <th scope="col"></th>
              {headings.map((key) => (
                <th scope="col">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {newRows &&
              newRows.map((element, index) => (
                <>
                  <tr>
                    <th scope="row">{index}</th>
                    {Object.values(element)?.map((value) => (
                      <td
                        scope="col"
                        // className="d-flex justify-content-center gap-3"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyTable;
