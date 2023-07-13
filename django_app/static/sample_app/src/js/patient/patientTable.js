import React, { useState ,useEffect} from "react";
import "../../css/login/login.css";
import { makeAPICallForPost,makeAPICallForGet } from "../utils/utils";
import { api_prefix} from "../network/network";
import URL_DICTIONARY from "../utils/urls";
import "../../css/patient/patient.css";
import DataTable from "react-data-table-component";
const PatientTable = (props) => {
    var [tableData, settableData]=useState([])
  useEffect(() => {

    var makeAPICall =()=> {
      var data= [];
      try{
            for(var i=0;i<props.data.testconducted_set.length;i++){

            var temp_dict={
                'name':props.data.testconducted_set[i]['test'],
                'price':props.data.testconducted_set[i]['price']+" Rs.",
                'date':props.data.testconducted_set[i]['created_on'].slice(0,10)
            }
            data.push(temp_dict)
            settableData(data)
            }
        console.log(data)
      }
      catch(err){
        console.log(err)
      }
    }
    makeAPICall();
}, []);

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
        selector: (row) => row.price,
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
    {
        name: "Date",
        selector: (row) => row.date,
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
]

  return (
    <div>  
        <h6 align="center">Tests Conducted</h6>
        <DataTable
                columns={columns}
                data={tableData}
                pagination
            />
    </div>
  );
};

export default PatientTable;
