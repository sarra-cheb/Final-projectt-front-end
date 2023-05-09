
import React from 'react'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
// import { toast } from 'react-toastify';
const isExpiredToken = (token) => {
  const decoded = jwt_decode(token);
  return Math.floor(new Date().getTime() / 1000) >= decoded.exp
}
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token !== null) {
    const expire = isExpiredToken(token)
    if (expire) {
      // toast.error('Token expired!')
      localStorage.removeItem('token')
      return <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>

    } else {
      return children;
    }
  } else {
    localStorage.removeItem('token')
    return <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
  }
}
export default PrivateRoute


// import React from "react";
// import { Route, Redirect } from "react-router-dom";

// const auth = localStorage.getItem("token");

// const PrivateRoute = ({ exact, component: Component, ...rest }) => (
//   <Route
//     exact={exact ? true : false}
//     rest
//     render={(props) =>
//       auth ? (
//         <Component {...props} {...rest}></Component>
//       ) : (
//         <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
//       )
//     }
//   ></Route>
// );

// export default PrivateRoute;
