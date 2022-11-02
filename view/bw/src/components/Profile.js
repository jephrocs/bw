import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/authService";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useRef } from "react";
import Form from "react-validation/build/form";


const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const userID = currentUser.user._id

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Edit Form
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
      AuthService.update( userID,picture, age, eyeColor, first, last, company, email, password, phone, address).then(
        (response) => {
          alert("User updated Successfully");
          setSuccessful(true);
         window.location.reload();

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
    <><Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-md-12">
      <div >
    

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            
            <div>
              <Row>
                <Col>
              <div className="form-group">
              
                <label htmlFor="first">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={first}
                  onChange={onChangeFirstname}
              
                />
              </div>
              </Col>
              <Col>
              <div className="form-group">
                <label htmlFor="last">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last"
                  value={last}
                  onChange={onChangeLastname}
               
                />
              </div>
              </Col>
              </Row>
              <div className="form-group">
                <label htmlFor="eyeColor">Eye Color</label>
                <input
                  type="text"
                  className="form-control"
                  name="eyeColor"
                  value={eyeColor}
                  onChange={onChangeEyeColor}
              
                />
              </div>
              <div className="form-group">
                <label htmlFor="picture">Profile Pic link</label>
                <input
                  type="text"
                  className="form-control"
                  name="picture"
                  value={picture}
                  onChange={onChangePicture}
                 
                />
              </div>
              <div className="form-group">
                <label htmlFor="eyeColor">Age</label>
                <input
                  type="text"
                  className="form-control"
                  name="age"
                  value={age}
                  onChange={onChangeAge}
               
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
              
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAddress}
              
                />
              </div>
     

<br></br>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Save Changes</button>
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

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
  
      </Modal.Footer>
    </Modal><div className="container" style={{ "text-align": "center" }}>
        <header className="jumbotron">
          <Col>
            <h3 className="container" style={{ "text-align": "center" }}>
              <strong>{currentUser.user.name.first + " " + currentUser.user.name.last + "'s"}</strong> Profile
            </h3>
            <div className="card card-container">
              <img src={currentUser.user.picture} alt="profile-pic" />
            </div>
            <Row>
              <Col>
                <h1>
                  <strong>Balance:</strong>
                  <br></br>
                  {currentUser.user.balance}
                </h1>
              </Col>
              <Col>
                <h1>
                  <Button variant="primary" size="lg" onClick={handleShow}>
                    Edit      </Button>
                </h1>
              </Col>
            </Row>


            <p>
              <strong>Email:</strong> {currentUser.user.email}
            </p>
            <p>
              <strong>Age:</strong> {currentUser.user.age}
            </p>
            <p>
              <strong>Eye Color:</strong> {currentUser.user.eyeColor}
            </p>
            <p>
              <strong>Company:</strong> {currentUser.user.company}
            </p>
            <p>
              <strong>Phone Number:</strong> {currentUser.user.phone}
            </p>
            <p>
              <strong>Address:</strong> {currentUser.user.address}
            </p>

            <ul>

            </ul>
          </Col>
        </header>
      </div></>
  );
};

export default Profile;