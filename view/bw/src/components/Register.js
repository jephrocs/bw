import React, { useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import logo from '../assests/logo.png'
import Row from 'react-bootstrap/Row';
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};



const vpassword = (value) => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");
  const [address, setAddress] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeFirstname = (e) => {
    const first = e.target.value;
    setFirst(first);
  };
  const onChangeLastname = (e) => {
    const last = e.target.value;
    setLast(last);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeAge = (e) => {
    const age = e.target.value;
    setAge(age);
  };

  const onChangeEyeColor = (e) => {
    const eyeColor = e.target.value;
    setEyeColor(eyeColor);
  };

  const onChangeCompany= (e) => {
    const company = e.target.value;
    setCompany(company);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };


  const onChangePicture = (e) => {
    const picture = e.target.value;
    setPicture(picture);
  };


  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register( picture, age, eyeColor, first, last, company, email, password, phone, address).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);

        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div >
      <div className="card card-container">
            <img src={logo} alt="blue-white-logo"/>
           </div>

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            
            <div>
               <h2 style={{'text-align':'center'}}>
                  Please Register
                </h2>
              <Row>
              <div className="form-group">
              
                <label htmlFor="first">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={first}
                  onChange={onChangeFirstname}
                  validations={[required]}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="last">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last"
                  value={last}
                  onChange={onChangeLastname}
                  validations={[required]}
                />
              </div>
              </Row>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={phone}
                  onChange={onChangePhone}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Company</label>
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  value={company}
                  onChange={onChangeCompany}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAddress}
                  validations={[required]}
                />
              </div>
     


              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
                <h3>            
            <Link to={"/login"} className="nav-link">
            Click Here to Log In   
            </Link>
          </h3>
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
