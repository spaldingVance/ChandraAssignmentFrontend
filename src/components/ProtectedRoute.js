import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from './Header';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { ApiService } from '../service/ApiService'

export const ProtectedRoute = () => {

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

  

  if (!credentials.verificationFinished || !credentials.loggedIn) {
    return (
      <Container fluid>
        <Header loggedIn={true} userid={user.userid} />
        <h3>Loading credentials</h3>
      </Container>
    )
  } else {
    return (
      <Container fluid>
        <Header loggedIn={true} userid={user.userid} />
        <Row>
          <Col md={{ span: 4, offset: 4 }} className="text-center">
            <h1>Protected Route</h1>
          </Col>
        </Row>
      </Container>
    )
  }
}
