import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import routes from "./routes";
function App() {

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
         
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={route.element}
          />
        ))}
        {/* <Route path="/login/" element={<LoginPage></LoginPage>} />  */}
        <Route path="/*" element={<h1>Hello</h1>} /> 
        {/* Redirect to "/404" if flag404 is true */}
      </Routes>
    </Router>
  );
}

export default App;
