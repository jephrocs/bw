import React, { useState, useEffect } from "react";
import AuthService from "../services/authService";
import UserService from "../services/userService";
import { Routes, Route, Link } from "react-router-dom";
const Home = () => {
  const currentUser = AuthService.getCurrentUser();
console.log(currentUser)
return(
  (!currentUser) ? ( 
    <div className="container">
       <h3>            
          <Link to={"/login"} className="nav-link">
          Please Click Here to Log In   
          </Link>
        </h3>
      
    </div>
  ) : (
    <div className="container">
     <h3>Congrats youre logged in</h3>
    </div>
  
  )
)};

export default Home;