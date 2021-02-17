import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { ApiService } from '../service/ApiService'

export const Update = (props) => {

  const [credentials, updateCredentials] = useState({
    loggedIn: false,
    verificationFinished: false
  })

  const [user, updateUser] = useState({
    userid: props.userid,
    password: "",
    name: "",
    age: null,
    role: "USER"
  })

  useEffect( async () => {
    const token = localStorage.getItem('jwt');

    const userid = localStorage.getItem('userid');
    console.log("userid: " + userid);

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get('http://localhost:8080/verify', config)
      .then(result => {
        updateCredentials({
          loggedIn: true,
          verificationFinished: true
        })
      })
      .catch(err => {
        console.log(err);
        updateCredentials({
          loggedIn: false,
          verificationFinished: true
        })
      })
    console.log("userid: " + userid);
    const apiService = ApiService();
    const currentUser = await apiService.getUser(userid);
    if (currentUser) {
      console.log("SUCCESS!");
      console.log(currentUser);
      updateUser({
        userid: userid,
        password: currentUser.password,
        name: currentUser.name,
        age: currentUser.age,
        role: currentUser.role
      })
    }

  }, [])



  const handleUseridChange = (event) => this.updateUser({ userid: event.target.value });

  const handleNameChange = (event) => this.updateUser({ name: event.target.value });

  const handlePasswordChange = (event) => this.updateUser({ password: event.target.value });

  const handleAgeChange = (event) => this.updateUser({ age: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    let result = ApiService().update(user.userid, user.password, user.name, user.age, user.role);
    if (!result) {
      console.log("ERROR");
      // this.setState({
      //   userid: "",
      //   password: "",
      //   error: true
      // })
      updateUser({
        userid: user.userid,
        password: user.password,
        name: user.name,
        age: user.age,
        role: user.role
      })
    }
  }

  if (!credentials.verificationFinished) {
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
                <Form.Control type="password"
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
                  id="age"
                  name="age"
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
