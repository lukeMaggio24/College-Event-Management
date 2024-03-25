import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please make sure all fields are filled out correctly.");
      setShowAlert(true);
      return;
    }

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/home");
      localStorage.setItem("email", email);
      localStorage.setItem("role", data.role);
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message);
      setShowAlert(true);
    }
  };

  return (
    <div className="center">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Login </Navbar.Brand>
          <Button variant="primary" onClick={() => navigate("/signup")}>
            Nagivate to Sign Up
          </Button>
        </Container>
      </Navbar>

      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}

      <Form className="loginSignupForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleLogin}>
          Log in
        </Button>
      </Form>
    </div>
  );
}

export default Login;
