import React from 'react';
import axios from 'axios';
import Header from './Header';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { ApiService } from '../service/ApiService';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.handleUseridChange = this.handleUseridChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);

    this.state = {
      userid: "",
      password: "",
      loggedIn: false,
      redirect: null,
      error: false
    }
  }

  handleUseridChange = (event) => this.setState({ userid: event.target.value });

  handlePasswordChange = (event) => this.setState({ password: event.target.value });

  handleError = (event) => {
    event.preventDefault();
    this.setState({ error: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let apiService = ApiService();
    apiService.login(this.state.userid, this.state.password, this.loginCallback);
  }

  loginCallback = (response) => {
    console.log(response.data);
    if (!response.data) {
      console.log("ERROR");
    } else {
      localStorage.setItem("userid", this.state.userid);
      localStorage.setItem("jwt", response.data.token);
      this.setState({ redirect: "/user/update" });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    } else {
      return (
        <Container fluid>
          <Header loggedIn={false} userid={this.state.userid} />
          <Row>
            <Col md={{ span: 4, offset: 4 }} className="text-center">
              <h1>Login</h1>
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
                <Button variant="primary" type="submit">Login</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}