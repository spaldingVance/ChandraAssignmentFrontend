import { Nav, Navbar } from 'react-bootstrap';

export default function Header(props) {

  const logout = () => { localStorage.clear(); };

  if (props.loggedIn) {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link style={{ color: "mediumseagreen" }} href="/">Home</Nav.Link>
          <Nav.Link style={{ color: "mediumseagreen" }} onClick={logout} href="/">Logout</Nav.Link>
        </Nav>
        <Navbar.Text >
        <span>Signed in as: {props.userid}</span>
        </Navbar.Text>

      </Navbar>
    )
  } else {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link style={{ color: "mediumseagreen" }} href="/">Home</Nav.Link>
          <Nav.Link style={{ color: "mediumseagreen" }} href="/user/login">Login</Nav.Link>
          <Nav.Link style={{ color: "mediumseagreen" }} href="/user/register">Register</Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}
