import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import Login from './Login';
import Header from './Header';
import Register from './Register';
import { Update } from './Update';
import { ApiService } from '../service/ApiService';
const { uuidv4 } = require('uuidv4');



class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userid: localStorage.getItem('userid'),
      name: "",
      jwt: localStorage.getItem('jwt'),
      authenticated: false
    }
  }

  componentDidUpdate() {
    if (this.state.userid) {
      console.log(this.state.userid);
      const apiService = ApiService();
      apiService.getUser(this.state.userid).then(res => {
        console.log("RES: ");
        console.log(res);
        this.setState({ name: res.name });
      })
      

    } else {
      let userid = localStorage.getItem('userid');
      if (userid) {
        console.log("SETTING USERID: " + userid);
        this.setState({ userid });
      } else {
        console.log("can't set userid: " + userid);
      }
    }
  }

  componentDidUpdate() {
    if (!this.state.userid) {
      console.log("no user id!");
      let userid = localStorage.getItem('userid');
      console.log("userid from localStorage is: " + userid);
      if (userid) {
        this.setState({ userid });
      }

    } else {
      console.log("user id is: " + this.state.userid);
    }

  }

  render() {
      return (
        <Container className="appContainer" fluid>
          <Router>
            <Switch>
              <Route path="/user/update" userid={this.state.userid}>
                <Update />
              </Route>
              <Route path="/user/login">
                <Login />
              </Route>
              <Route path="/user/register">
                <Register />
              </Route>
            </Switch>
          </Router>
        </Container >
      )
  }
}



export default App;
