import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import logo from '../assests/logo.png';
import { Routes, Route, Link } from "react-router-dom";

import AuthService from "../services/authService";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const currentUser = AuthService.getCurrentUser();
    let navigate = useNavigate();
  
    const form = useRef();
    const checkBtn = useRef();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const onChangeEmail = (e) => {
      const email = e.target.value;
      setEmail(email);
    };
  
    const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      setMessage("");
      setLoading(true);
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        const res = await AuthService.login(email, password).then(
          () => {
            console.log('res.token')
            navigate("/Profile");
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setLoading(false);
            setMessage(resMessage);
          }
        );
      } else {
        setLoading(false);
      }
    };
  
    return (
      <div className="col-md-12">
  
        <div className="card card-container">
            <img src={logo} alt="blue-white-logo"/>
           </div>
  
           {currentUser ? (
          <div >
            
              <Link to={"/profile"} className="nav-link">
                You're already logged in. Click to return to your profile
              </Link>
       
           
          </div>
        ) : (
          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[required]}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>
  
            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
  
             {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}  
            <CheckButton 
           style={{ display: "none" }} ref={checkBtn} 
            />
          </Form>
        )}
        </div>



     
  )};
  
  export default Login;