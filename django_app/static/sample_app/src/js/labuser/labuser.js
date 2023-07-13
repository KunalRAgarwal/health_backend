import React, { useState, useEffect } from "react";
import { makeAPICallForGet } from "../utils/utils";
import { api_prefix } from "../network/network";
import URL_DICTIONARY from "../utils/urls";
import NavbarComponent from "../navbar/navbar";
import "../../css/patient/patient.css";
import { CFormInput, CForm } from "@coreui/react";
import Select from "react-select";
import LabTable from "./labusertable";
const LabUserPage = () => {
  var [testData, settestData] = useState([]);
  var [selectedTestList,setselectedTestList]= useState([]);
  var [patientOptions, setpatientOptions] = useState([]);
  var [patientData, setpatientData] = useState([]);
  var [testOptions, settestOptions] = useState([]);
  useEffect(() => {
    var makeAPICall = async () => {
      try {
        var api_call = await makeAPICallForGet(
          api_prefix + URL_DICTIONARY.GET_TESTS_OF_LAB,
          {}
        );
        settestData(api_call.data.results);
        var tempSelectData = [];
        for (var i = 0; i < api_call.data.results.length; i++) {
          var temp_dict = {
            label: api_call.data.results[i]["name"],
            value: api_call.data.results[i]["testid"],
          };
          tempSelectData.push(temp_dict);
        }
        settestOptions(tempSelectData);
        api_call = await makeAPICallForGet(
          api_prefix + URL_DICTIONARY.GET_PATIENTS_OF_LABS,
          {}
        );
        setpatientData(api_call.data.results);
        var tempSelectData = [];
        for (i = 0; i < api_call.data.results.length; i++) {
          var temp_dict = {
            label: api_call.data.results[i]["username"],
            value: api_call.data.results[i]["patientid"],
          };
          tempSelectData.push(temp_dict);
        }
        tempSelectData.unshift({ label: "New Patient", value: "New Patient" });
        setpatientOptions(tempSelectData);
      } catch (err) {
        console.log(err);
      }
    };
    makeAPICall();
  }, []);

  var handleTestChane = (e) => {
    console.log(e);
    var tmpSelectedOptions = [];
    for (var i = 0; i <e.length; i++) {
    let selectedEntry = testData.filter(function (el) {
        return el.testid === e[i]['value'];
      });
    console.log(selectedEntry[0]);
    tmpSelectedOptions.push(selectedEntry[0]);
    }
    setselectedTestList(tmpSelectedOptions)
  }

  var handleExistingPatientChane = (e) => {
    if (e.value != "New Patient") {
      let selectedEntry = patientData.filter(function (el) {
        return el.patientid === e.value;
      });
      document.getElementById("name").value = selectedEntry[0]["name"];
      document.getElementById("username").value = selectedEntry[0]["username"];
      document.getElementById("email").value = selectedEntry[0]["email"];
      document.getElementById("phone").value = selectedEntry[0]["phone"];
      document.getElementById("username").disabled=true
    } else {
      document.getElementById("name").value = "";
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("username").disabled=false
    }
  };
  return (
    <div>
      <NavbarComponent />
      <br></br>
       <hr />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h6>Select Existing Patient</h6>
      </div>
      <CForm
        style={{
          marginTop: "1%",
          marginLeft: "11%",
          textAlign: "left",
          marginRight: "13%",
          marginBottom: "2%",
        }}
      >
        <Select
          options={patientOptions}
          placeholder="Select Patient"
          onChange={(e) => handleExistingPatientChane(e)}
          defaultValue={{ label: "New Patient", value: "New Patient" }}
        />
      </CForm>
       <hr />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h6>Create New Patient</h6>
      </div>
      <hr />
      <br></br>
      <CForm
        style={{
          marginTop: "1%",
          marginLeft: "11%",
          textAlign: "left",
          marginRight: "13%",
          marginBottom: "2%",
        }}
      >
        <CFormInput
          id={"username"}
          type="text"
          width={"80%"}
          placeholder="Username"
          required
        ></CFormInput>
        <br></br>
        <CFormInput
          id={"name"}
          type="text"
          width={"80%"}
          placeholder="Name"
          required
        ></CFormInput>
        <br></br>
        <CFormInput
          id={"phone"}
          type="text"
          width={"80%"}
          placeholder="Number"
          required
        ></CFormInput>
        <br></br>
        <CFormInput
          id={"email"}
          type="email"
          width={"80%"}
          placeholder="Email"
          required
        ></CFormInput>
        <br></br>
        <Select
          options={testOptions}
          onChange={(e) => handleTestChane(e)}
          placeholder="Select Test"
          isMulti
          required
        />
        <br></br>
        {<LabTable data={selectedTestList}></LabTable>}
      </CForm>

    </div>
  );
};

export default LabUserPage;
