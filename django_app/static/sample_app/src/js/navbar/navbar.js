import React,  {useEffect,useState} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { makeAPICallForGet } from "../utils/utils";
import { _eraseCookie, api_prefix} from "../network/network";
import URL_DICTIONARY from "../utils/urls";
import "../../css/navbar/navbar.css";
import { useNavigate } from "react-router";
const NavbarComponent = () =>{
    var [name,setName]=useState("")
    const navigate = useNavigate();
    useEffect(() => {

        var makeAPICall = async() => {
          try{
            const response = await makeAPICallForGet(api_prefix + URL_DICTIONARY.GET_USER_INFO);
            setName(response.data.username)
          }
          catch(err){
            console.log(err)
          }
        }
        makeAPICall();
    }, []);

    const Logout = (e) => {
        e.preventDefault();
        document.cookie = `sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        navigate("/login");
        }

    return (    
        <div>
        <Navbar bg="primary" expand="lg" className="bg-body-tertiary">
  <Container style={{ marginLeft: "0%" }}>
    <div className="d-flex justify-content-between w-100">
      <div>
        <Navbar.Brand style={{ height: "50px" }}>
          <img style={{ height: "100%" }} src="https://s3-ap-southeast-1.amazonaws.com/livehealthuser/images/CL-logo-green-black-text-1000px.svg" />
        </Navbar.Brand>
      </div>
      <div>
        <Nav>
          <NavDropdown title={<h5 style={{ color: "white" ,marginRight:"0%"}}>Welcome back,{name} !!</h5>}>
            <NavDropdown.Item onClick={(e) => Logout(e)}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </div>
    </div>
  </Container>
</Navbar>



        </div>
    )
}

export default NavbarComponent;