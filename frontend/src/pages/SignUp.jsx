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
import { useEffect } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [dropdownTitle, setDropdownTitle] = useState("Status");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [university, setUniversity] = useState("Choose a University");
  const [rso, setRso] = useState("");

  // on page load, fetch unis from dropdown
  const [universities, setUniversities] = useState([]);
  useEffect(() => {
    const fetchUniversities = async () => {
      const response = await fetch("http://localhost:3000/fetchunis");
      const data = await response.json();
      setUniversities(data);
    };

    fetchUniversities();
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();

    if (
      dropdownTitle === "Status" ||
      !email ||
      !password ||
      (dropdownTitle === "Admin" && (!university || !rso))
    ) {
      setErrorMessage("Please make sure all fields are filled out correctly.");
      setShowAlert(true);
      return;
    }

    if (dropdownTitle === "Admin") {
      const responseUniID = await fetch(
        "http://localhost:3000/fetchuni_id?name=" +
          encodeURIComponent(university)
      );
      if (responseUniID.status === 404) {
        setErrorMessage(
          "University name does not exist, please use the exact name"
        );
        setShowAlert(true);
        return;
      }
    }

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role: dropdownTitle,
        university,
        rso,
      }),
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
            Navigate to Login
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

        <DropdownButton
          id="dropdown-basic-button"
          title={university}
          className="mr-2 mb-2"
        >
          {universities.map((university) => (
            <Dropdown.Item
              key={university.id}
              onClick={() => {
                setUniversity(university.name);
                // setSelectedUniversity(university.name); // Add this line
              }}
            >
              {university.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
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

        {dropdownTitle === "Admin" && (
          <>
            {/* <Form.Group className="mb-3" controlId="formBasicUniversity">
              <Form.Label>University</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter University"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formBasicRso">
              <Form.Label>RSO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter RSO"
                value={rso}
                onChange={(e) => setRso(e.target.value)}
              />
            </Form.Group>
          </>
        )}

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
