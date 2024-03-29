import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";

function SignUp() {
  const navigate = useNavigate();
  const [dropdownTitle, setDropdownTitle] = useState("Status");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    if (dropdownTitle === "Status" || !email || !password) {
      setErrorMessage("Please make sure all fields are filled out correctly.");
      setShowAlert(true);
      return;
    }

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role: dropdownTitle }),
    });

    if (response.ok) {
      navigate("/login");
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
          <Navbar.Brand href="#home">Sign up </Navbar.Brand>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Nagivate to Login
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
        <DropdownButton id="dropdown-basic-button" title={dropdownTitle}>
          <Dropdown.Item onClick={() => setDropdownTitle("Student")}>
            Student
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdownTitle("Admin")}>
            Admin
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdownTitle("Super Admin")}>
            Super Admin
          </Dropdown.Item>
        </DropdownButton>
        <Form.Text className="text-muted">
          You will be assigned a User ID once logged in<br></br>
        </Form.Text>
        <Button variant="primary" type="submit" onClick={handleSignup}>
          Create Account
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
