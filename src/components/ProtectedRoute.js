// import ApiService from '../service/ApiService';
// import React, {useState, useEffect, Component} from "react";
// import {Route, Redirect} from 'react-router-dom';
// import axios from 'axios';

// export const ProtectedRoute = ({ component: Component, ...rest }) => {

//   const [credentials, updateCredentials] = useState({
//     loggedIn: false,
//     verificationFinished: false
//   })

//   useEffect(() => {
//     const token = sessionStorage.getItem('jwt');

//     const config = {
//       headers: { Authorization: `Bearer ${token}` }
//     };

//     axios.get('http://localhost:8080/verify', config)
//       .then(result => {
//         updateCredentials({
//           loggedIn: true,
//           verificationFinished: true
//         })
//       })
//       .catch(err => {
//         console.log(err);
//         updateCredentials({
//           loggedIn: false,
//           verificationFinished: true
//         })
//       })
//   }, [])

//   if (!credentials.verificationFinished) {
//     return (
//       <div>Loading credentials</div>
//     )
//   }

//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (credentials.loggedIn) {
//           return <Component {...props} />
//         } else {
//           return <Redirect to={
//             {
//               pathname: "/login",
//               state: {
//                 from: props.location
//               }
//             }
//           } />
//         }
//       }}
//     />
//   )
// }