import React from "react";
import LoginPage from "./js/login/login";
import SignupPage from "./js/signup/signup";
import PatientInfo from "./js/patient/patient";
import LabUserPage from "./js/labuser/labuser";
const routes = [
    { path: "login/", exact: true, name: "login", element:<LoginPage/> },
    { path: "signup/", exact: true, name: "signup", element:<SignupPage/> },
    { path: "patient/", exact: true, name: "patient", element:<PatientInfo/> },
    { path: "labuser/", exact: true, name: "labuser", element:<LabUserPage/> },
]

export default routes;