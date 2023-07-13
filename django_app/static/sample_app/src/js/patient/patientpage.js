import React, { useState ,useEffect,useRef} from "react";
import "../../css/login/login.css";
import {makeAPICallForGet } from "../utils/utils";
import { api_prefix} from "../network/network";
import URL_DICTIONARY from "../utils/urls";
import Accordion from 'react-bootstrap/Accordion';
import "../../css/patient/patient.css";
import { useReactToPrint } from 'react-to-print';
import { Card } from "react-bootstrap";
import PatientTable from "./patientTable";

const PatientPage = () => {
  var [billdata,setBillData] = useState([])
  const [expandedAccordion, setExpandedAccordion] = useState([]);
  const eventRef = useRef();
  const componentRef = useRef();
  useEffect(() => {
    var makeAPICall = async() => {
      try{
      var api_call = await makeAPICallForGet(api_prefix+URL_DICTIONARY.GET_BILLING_INFO,{})
      setBillData(api_call.data.results)
      }
      catch(err){
        console.log(err)
      }
    }
    makeAPICall();
}, []);

const handlePrint = useReactToPrint({
    content: () => document.getElementById(`Bill${eventRef.current.target.id}`),
  });
  

  const handleClick = (e) => {
    eventRef.current = e; // Store the event object in the ref
    handlePrint();
  };
  
  const handleAccordionClick = (index) => {
    if (expandedAccordion.includes(index)) {
      setExpandedAccordion(expandedAccordion.filter((item) => item !== index));
    } else {
      setExpandedAccordion([...expandedAccordion, index]);
    }
  };
  
  

  return (
    <div>
    {billdata.map(function(object, i){
        return(
            <div key={i}>
            <Card
                className="mb-4"
                style={{
                    minHeight: "90%",
                    shadowRadius: 10,
                    width: "80%",
                    marginLeft: "10%",
                    marginBottom:"5%",
                    boxShadow:
                        "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
                }}
            >
            <Accordion className="accordion">
            <Accordion.Item eventKey={i}>
            <Accordion.Header onClick={() => handleAccordionClick(i)}>
            <h6 style={{marginBottom:"1%"}}>Test {i + 1}</h6>
            <h6 style={{alignContent:"flex-start"}}>Total Price: -{object['totalprice']} Rs, Lab Name-{object['labname']} ,Lab Email:-{object['labemail']}, Lab Phone:-{object['labphone']}</h6>
            <h6 style={{color:"blue"}}>{expandedAccordion.includes(i) ? 'View Less' : 'View More'}</h6>
            </Accordion.Header>
            <Accordion.Body style={{ marginLeft: '10%', marginRight: '10%' }}>
                <div id={`Bill${i}`} className={i}>    
                <PatientTable data={object} />
                </div>
                <button className = "btn btn-primary" style={{marginBottom:"5%"}} id={i} onClick={(e) => handleClick(e)}>Print</button>
            </Accordion.Body>
            </Accordion.Item>

            </Accordion>
            </Card>
            
            </div>
        );
    })}
    
      
    </div>
  );
};

export default PatientPage;
