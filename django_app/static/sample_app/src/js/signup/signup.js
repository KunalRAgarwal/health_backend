import React, { useState ,useEffect} from "react";
import "../../css/login/login.css";
import { CFormInput, CForm } from "@coreui/react";
import { makeAPICallForPost,makeAPICallForGet } from "../utils/utils";
import { api_prefix} from "../network/network";
import URL_DICTIONARY from "../utils/urls";
import Select from 'react-select'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretcode, setSecretCode] = useState("");
  const [select_options, setSelectOptions] = useState()
  const [lab_id, setLabId] = useState("")
  const [alert_open, setOpen] = useState(false);
  const [alert_message, setAlertMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {

    var makeAPICall = async() => {
      try{
      var lab_info_api = await makeAPICallForGet(api_prefix+URL_DICTIONARY.GET_ALL_LAB_INFO,{});
      var complete_data=[];
      complete_data=lab_info_api.data.results
      while(lab_info_api.data.next)
      {
        lab_info_api = await makeAPICallForGet(lab_info_api.data.next,{});
        complete_data=complete_data.concat(lab_info_api.data.results);
      }
      var options = [];
      for (var i=0; i<complete_data.length;i++)
      {
        options.push({ value: complete_data[i].labid, label: complete_data[i].name });
      }
      setSelectOptions(options)
      }
      catch(err){
        setAlertMessage(err.message)
        setOpen(true)
      }
    }
    makeAPICall();
}, []);


  //This code is setting the username to the value of the event target when it is changed.
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  //This code sets the value of the password when the event (e.g. typing) is triggered.
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSecretChange = (event) => {
    setSecretCode(event.target.value);
  };

  const handleLabChange = (event) => {
    setLabId(event.value);
  };

  //This code logs the user type, username, and password to the console for login logic.
  const handleCreateUser =async(event) => {
    // Perform login logic here based on userType, username, and password
    event.preventDefault();
    var payload = {
        labid: lab_id,
        username: username,
        password: password,
        secret_code:secretcode
    }
    var api_url=api_prefix+URL_DICTIONARY.CREATE_LAB_USER
    try {
    var api_response=await makeAPICallForPost(api_url, payload)
    navigate("/login");
    }
    catch (err) {
          console.log(err);
          setAlertMessage(err.message)
          setOpen(true)
        }
  
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div>
          <h4
            style={{
              "font-weight": "400",
              "margin-top": "15px",
              "margin-bottom": "25px",
              "marginLeft": "11%",
            }}
          >
            SignUp Form Below
          </h4>
        </div>
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
          sx={{ width: '76%' }}
          spacing={2}
        >
          {alert_message}
        </Alert>}
        <br />
        <CForm
          style={{
            marginTop: "1%",
            marginLeft: "11%",
            textAlign: "left",
            marginRight: "13%",
            marginBottom: "2%",
          }}
          onSubmit={(e) => handleCreateUser(e)}
        >
          <Select
            options={select_options}
            placeholder="Select Lab"
            onChange={(e) => handleLabChange(e)}
            required
          />
          <br/>
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
          <CFormInput
            type="password"
            placeholder="Secret Code"
            onChange={(e) => handleSecretChange(e)}
            required
          ></CFormInput>
           <br />
          <button className="btn btn-success" type="submit">
            Sign Up
          </button>
        </CForm>
      </div>
      <div className="login-image">
        <img
          src="https://cdn.dribbble.com/users/1138853/screenshots/4841628/28_34_gif.gif"
          alt="Signup"
        />
      
      </div>
    </div>
  );
};

export default SignupPage;
