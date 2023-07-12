import React from "react";
import LoginPage from "./js/login/login";
import SignupPage from "./js/signup/signup";
const routes = [
    { path: "login/", exact: true, name: "login", element:<LoginPage/> },
    { path: "signup/", exact: true, name: "signup", element:<SignupPage/> },
]

export default routes;