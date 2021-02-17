import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { ApiService } from '../service/ApiService'

export const Update = () => {

  const [credentials, updateCredentials] = useState({
    loggedIn: false,
    verificationFinished: false
  })

  const [user, updateUser] = useState({
    userid: localStorage.getItem('userid'),
    password: "",
    name: "",
    age: 0,
    role: "USER"
  })

  useEffect(() => {
    if (!user.name) {
      const token = localStorage.getItem('jwt');
      if (token && user.userid) {
        console.log("token and userid valid");


        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const getUser = ApiService().getUser;

        axios.get('http://localhost:8080/verify', config)
          .then(result => {
            console.log("verify result: ");
            console.log(result);
            updateCredentials({
              loggedIn: true,
              verificationFinished: true
            })
            console.log("making get user request with userid: " + user.userid);
            getUser(user.userid)
              .then((res) => {
                console.log(res);
                if (res) {
                  console.log("SUCCESS!");
                  console.log(res);
                  updateUser({
                    userid: res.data.userid,
                    password: res.data.password,
                    name: res.data.name,
                    age: res.data.age,
                    role: res.data.role
                  })
                } else {

                  console.log("get user failed")
                  console.log(res);
                  console.log(res.data);
                  console.log(res.data.userid);
                }
              })
              .catch(err => {
                console.log(err);
                updateCredentials({
                  loggedIn: false,
                  verificationFinished: true
                })
              })
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        console.log("invalid token or userid");
        console.log("token: " + token);
        console.log("userid: " + user.userid);
      }
    }

  }, [])



  const handleUseridChange = (event) => {
    // event.preventDefault();
    updateUser({ userid: event.target.value });
  }

  const handleNameChange = (event) => {
    // event.preventDefault();
    updateUser({ name: event.target.value });
  }

  const handlePasswordChange = (event) => {
    // event.preventDefault();
    updateUser({ password: event.target.value });
  }

  const handleAgeChange = (event) => { 
    // event.preventDefault();
    updateUser({ age: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let result = ApiService().update(user.userid, user.password, user.name, user.age, user.role);
    if (!result) {
      console.log("ERROR");

      updateUser({
        userid: user.userid,
        password: user.password,
        name: user.name,
        age: user.age,
        role: user.role
      })
    }
  }

  if (!credentials.verificationFinished || !credentials.loggedIn) {
    return (
      <div>Loading credentials</div>
    )
  } else {
    return (
      <div>
        <Row>
          <Col md={{ span: 4, offset: 4 }} className="text-center">
            <h1>Update</h1>
            <br />
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>User Id</Form.Label>
                <Form.Control type="text"
                  id="userid"
                  name="userid"
                  value={user.userid}
                  onChange={handleUseridChange}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="text"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handlePasswordChange}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleNameChange}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="number"
                  id="age"
                  name="age"
                  value={user.age}
                  onChange={handleAgeChange}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control type="text"
                  id="role"
                  name="role"
                  value={user.role}
                  readOnly />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
