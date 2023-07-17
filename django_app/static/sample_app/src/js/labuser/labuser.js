import React, { useState, useEffect } from "react";
import { makeAPICallForGet, makeAPICallForPost } from "../utils/utils";
import { api_prefix } from "../network/network";
import URL_DICTIONARY from "../utils/urls";
import NavbarComponent from "../navbar/navbar";
import "../../css/patient/patient.css";
import { CFormInput, CForm } from "@coreui/react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LabTable from "./labusertable";
import { Card } from "react-bootstrap";
const LabUserPage = () => {
  var [testData, settestData] = useState([]);
  var [selectedTestList, setselectedTestList] = useState([]);
  var [patientOptions, setpatientOptions] = useState([]);
  var [patientData, setpatientData] = useState([]);
  var [testOptions, settestOptions] = useState([]);
  var [selectedtestOptions, setselectedtestOptions] = useState([]);
  var [username, setusername] = useState("");
  var [name, setname] = useState("");
  var [email, setemail] = useState("");
  var [phone, setphone] = useState("");
  var [totalCost, settotalCost] = useState(0);
  var [patientid, setpatientid] = useState("NA");
  var [testidSelected, settestidSelected] = useState([]);
  var [patientSelect, setpatientSelect] = useState([]);

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
        toast.error(err.message, {
            autoClose: 1000,
            position: toast.POSITION.BOTTOM_RIGHT,
            style: {
              fontSize: "15px",
              backgroundColor: "rgb(29, 57, 109)",
              color: "#fff",
              fontWeight: "bold",
            },
          });
      }
    };
    makeAPICall();
  }, []);

  var handleTestChane = (e) => {
    setselectedtestOptions(e);
    var cost = 0;
    var testidTemp = [];
    var tmpSelectedOptions = [];
    for (var i = 0; i < e.length; i++) {
      let selectedEntry = testData.filter(function (el) {
        return el.testid === e[i]["value"];
      });
      testidTemp.push(selectedEntry[0]["testid"]);
      tmpSelectedOptions.push(selectedEntry[0]);
      cost = parseInt(cost) + parseInt([selectedEntry[0]["price"]]);
    }
    settotalCost(cost);
    settestidSelected(testidTemp);
    setselectedTestList(tmpSelectedOptions);
  };

  var handleExistingPatientChane = (e) => {
    setpatientSelect(e);
    if (e.value != "New Patient") {
      let selectedEntry = patientData.filter(function (el) {
        return el.patientid === e.value;
      });
      setname(selectedEntry[0]["name"]);
      setusername(selectedEntry[0]["username"]);
      setemail(selectedEntry[0]["email"]);
      setphone(selectedEntry[0]["phone"]);
      setpatientid(selectedEntry[0]["patientid"]);
      document.getElementById("username").disabled = true;
      document.getElementById("name").value = selectedEntry[0]["name"];
      document.getElementById("username").value = selectedEntry[0]["username"];
      document.getElementById("email").value = selectedEntry[0]["email"];
      document.getElementById("phone").value = selectedEntry[0]["phone"];
      setselectedtestOptions([]);
      setselectedTestList([]);
    } else {
      setname("");
      setemail("");
      setphone("");
      setusername("");
      setpatientid("NA");
      document.getElementById("username").disabled = false;
      document.getElementById("name").value = "";
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      setselectedtestOptions([]);
      setselectedTestList([]);
    }
  };
  var handleBillCreation = async (e) => {
    e.preventDefault();
    var payload = {
      name: name,
      username: username,
      email: email,
      phone: phone,
      totalprice: totalCost,
      testconducted_ids: testidSelected.join(","),
    };
    if (patientid != "NA") {
      payload.patientid = patientid;
    }
    try {
      var makeAPICall = await makeAPICallForPost(
        api_prefix + URL_DICTIONARY.CREATE_BILL,
        payload
      );
      toast.success("Bill Created Succesfully", {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_RIGHT,
        style: {
          fontSize: "15px",
          backgroundColor: "rgb(29, 57, 109)",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      setname("");
      setemail("");
      setphone("");
      setusername("");
      setpatientid("NA");
      document.getElementById("username").disabled = false;
      document.getElementById("name").value = "";
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      setselectedtestOptions([]);
      setselectedTestList([]);
      setpatientSelect({ label: "New Patient", value: "New Patient" })
    } catch (err) {
      toast.error(err.message, {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_RIGHT,
        style: {
          fontSize: "15px",
          backgroundColor: "rgb(29, 57, 109)",
          color: "#fff",
          fontWeight: "bold",
        },
      });
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
      <hr />
      <Card
        className="mb-4"
        style={{
          minHeight: "110%",
          shadowRadius: 10,
          width: "90%",
          marginLeft: "5%",

          boxShadow:
            "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
        }}
      >
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
            value={patientSelect}
          />
        </CForm>
      </Card>
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
      <Card
        className="mb-4"
        style={{
          minHeight: "100%",
          shadowRadius: 10,
          width: "90%",
          marginLeft: "5%",
          marginBottom: "5%",
          boxShadow:
            "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
        }}
      >
        <CForm
          style={{
            marginTop: "1%",
            marginLeft: "11%",
            textAlign: "left",
            marginRight: "13%",
            marginBottom: "2%",
          }}
          onSubmit={(e) => handleBillCreation(e)}
        >
          <br></br>
          <CFormInput
            id={"username"}
            value={username}
            type="text"
            width={"80%"}
            placeholder="Username"
            onChange={(e) => {
              setusername(e.target.value);
            }}
            required
          ></CFormInput>
          <br></br>
          <CFormInput
            id={"name"}
            value={name}
            type="text"
            width={"80%"}
            placeholder="Name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            required
          ></CFormInput>
          <br></br>
          <CFormInput
            id={"phone"}
            value={phone}
            type="text"
            width={"80%"}
            placeholder="Number"
            min={"10"}
            max={"10"}
            onChange={(e) => {
              setphone(e.target.value);
            }}
            required
          ></CFormInput>
          <br></br>
          <CFormInput
            id={"email"}
            value={email}
            type="email"
            width={"80%"}
            placeholder="Email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
          ></CFormInput>
          <br></br>
          <Select
            options={testOptions}
            value={selectedtestOptions}
            onChange={(e) => handleTestChane(e)}
            placeholder="Select Test"
            isMulti
            required
          />
          <br></br>
          <LabTable data={selectedTestList}></LabTable>
          <br></br>
          <button className="btn btn-success" type="submit">
            Sign Up
          </button>
        </CForm>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default LabUserPage;
