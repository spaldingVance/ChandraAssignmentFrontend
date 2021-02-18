import React from 'react';
import axios from 'axios';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { ApiService } from '../service/ApiService'
import Header from './Header';

export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.handleUseridChange = this.handleUseridChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      userid: "",
      password: "",
      name: "",
      age: null,
      role: "USER",
      error: false
    }

  }

  handleUseridChange = (event) => this.setState({ userid: event.target.value });

  handleNameChange = (event) => this.setState({ name: event.target.value });

  handlePasswordChange = (event) => this.setState({ password: event.target.value });

  handleAgeChange = (event) => this.setState({ age: event.target.value });

  handleError = (event) => {
    event.preventDefault();
    this.setState({ error: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let result = ApiService().register(this.state.userid, this.state.password, this.state.name, this.state.age, this.state.role);
    if (!result) {
      console.log("Registration Error");
      this.setState({
        userid: "",
        password: "",
        error: true
      })
    }
  }

  render() {
    return (
      <Container fluid>
        <Header/>
        <Row>
          <Col md={{ span: 4, offset: 4 }} className="text-center">
            <h1>Register</h1>
            <br />
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>User Id</Form.Label>
                <Form.Control type="text"
                  id="userid"
                  name="userid"
                  value={this.state.userid}
                  onChange={this.handleUseridChange}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="number"
                  id="age"
                  name="age"
                  value={this.state.age}
                  onChange={this.handleAgeChange}
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control type="text"
                  id="age"
                  name="age"
                  value={this.state.role}
                  readOnly />
              </Form.Group>
              <Button variant="primary" type="submit">
                Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }




}