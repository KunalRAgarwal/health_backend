import React, { useState ,useEffect} from "react";
import "../../css/login/login.css";
import { CFormInput, CForm } from "@coreui/react";
import { makeAPICallForPost,makeAPICallForGet } from "../utils/utils";
import { api_prefix} from "../network/network";
import URL_DICTIONARY from "../utils/urls";
import { useNavigate } from "react-router";
import NavbarComponent from "../navbar/navbar";
import Accordion from 'react-bootstrap/Accordion';
import PatientPage from "./patientpage";
import "../../css/patient/patient.css";
import { Card } from "react-bootstrap";
const PatientInfo = () => {
  const navigate = useNavigate();
  useEffect(() => {

    var makeAPICall = async() => {
      try{
      
      }
      catch(err){
      }
    }
    makeAPICall();
}, []);

  return (
    <div>
      <NavbarComponent/>
      <br></br>
      {/* <Card> */}
      <PatientPage/>
      {/* </Card> */}
    </div>
  );
};

export default PatientInfo;
