import React, { useState } from "react";
import "../../css/login/login.css";
import { CFormInput, CForm } from "@coreui/react";
import { useNavigate } from "react-router";
import URL_DICTIONARY from "../utils/urls";
import { makeAPICallForPost } from "../utils/utils";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { api_prefix } from "../network/network";
const LoginPage = () => {
  const [userType, setUserType] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert_open, setOpen] = useState(false);
  const [alert_message, setAlertMessage] = useState("");
  const navigate = useNavigate();

  //This code is setting the username to the value of the event target when it is changed.
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  //This code sets the value of the password when the event (e.g. typing) is triggered.
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate("/signup");
  };
  //This code logs the user type, username, and password to the console for login logic.
  const handleLogin = async (event) => {
    event.preventDefault();

    var payload={
      'username':username,
      'password':password,
      'usertype':userType
    }
    try{
      var api_call= await makeAPICallForPost(api_prefix+URL_DICTIONARY.LOGIN_URL,payload)
    }
    catch(err){
      setAlertMessage(err.message)
      setOpen(true)
    }
    
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div>
        {alert_open && <Alert
        style={{marginLeft: "11%" }}
        variant="filled" 
        severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ width: '80%' }}
          spacing={2}
        >
          {alert_message}
        </Alert>}
          <h3 style={{ color: "#377fb7", marginLeft: "11%" }}>
            Democratising Healthcare Diagnostics
          </h3>
          <h4
            style={{
              "font-weight": "400",
              "margin-top": "15px",
              "margin-bottom": "25px",
              marginLeft: "11%",
            }}
          >
            Login to Smart | Simple | Secure LIMS
          </h4>
        </div>
        <div
          style={{
            marginTop: "1%",
            marginLeft: "11%",
            textAlign: "left",
            marginRight: "13%",
            marginBottom: "2%",
          }}
        >
          <button
            className={
              userType === "patient"
                ? "user-type-button active"
                : "user-type-button"
            }
            onClick={() => setUserType("patient")}
          >
            Patient
          </button>
          <button
            className={
              userType === "labuser"
                ? "user-type-button active"
                : "user-type-button"
            }
            onClick={() => setUserType("labuser")}
          >
            Labuser
          </button>
        </div>
        <br />
        <CForm
          style={{
            marginTop: "1%",
            marginLeft: "11%",
            textAlign: "left",
            marginRight: "13%",
            marginBottom: "2%",
          }}
          onSubmit={(e) => handleLogin(e)}
        >
          <CFormInput
            type="text"
            width={"80%"}
            placeholder="Username"
            onChange={(e) => handleUsernameChange(e)}
            required
          ></CFormInput>
          <br />
          <CFormInput
            type="password"
            placeholder="Password"
            onChange={(e) => handlePasswordChange(e)}
            required
          ></CFormInput>
          <br />
          <br />
          <button className="btn btn-success" type="submit">
            Sign in using our secure server
          </button>
          <br />
          <br />
          { userType === "labuser"
                ? <a
                href="/signup/"
                style={{
                  marginTop: "2%",
                  marginBottom: "4%", 
                  fontSize: "12px",
                  color: "blue",
                }}
                onClick={(e) => handleSignUp(e)}
              >
                SignUp?
              </a>
                : <div></div>
          }
        </CForm>
      </div>
      <div className="login-image">
        <img
          src="https://i0.wp.com/blog.creliohealth.com/wp-content/uploads/2023/05/Blog-Feature-Image.png?w=800&ssl=1"
          alt="Login"
        />
      </div>
    </div>
  );
};

export default LoginPage;
