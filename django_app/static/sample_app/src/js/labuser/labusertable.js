import React, { useState, useEffect } from "react";
import "../../css/login/login.css";
import { makeAPICallForPost, makeAPICallForGet } from "../utils/utils";
import { api_prefix } from "../network/network";
import URL_DICTIONARY from "../utils/urls";
import "../../css/patient/patient.css";
import DataTable from "react-data-table-component";
const LabTable = (props) => {
  var [tableData, settableData] = useState([]);
  useEffect(() => {
    var makeAPICall = () => {
      var data = [];
      try {
        console.log(props.data);
        for (var i = 0; i < props.data.length; i++) {
          data.push({
            name: props.data[i].name,
            price: props.data[i].price,
          });
        }
        settableData(data);
      } catch (err) {
        console.log(err);
      }
    };
    makeAPICall();
  }, [props.data]);

  var columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      conditionalCellStyles: [
        {
          when: (row) => tableData.indexOf(row) % 2 == 0,
          style: {
            backgroundColor: "#f2f2f2",
          },
        },
        {
          when: (row) => tableData.indexOf(row) % 2 != 0,
          style: {
            backgroundColor: "white",
          },
        },
      ],
    },
    {
      name: "Price",
      selector: (row) => row.price+" Rs.",
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => tableData.indexOf(row) % 2 == 0,
          style: {
            backgroundColor: "#f2f2f2",
          },
        },
        {
          when: (row) => tableData.indexOf(row) % 2 != 0,
          style: {
            backgroundColor: "white",
          },
        },
      ],
    },
  ];
  if(tableData.length>0){
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h6>Selected Tests</h6>
      </div>
      <DataTable columns={columns} data={tableData} pagination />
    </div>
  );}
  else{
    return null
}
  
};

export default LabTable;
