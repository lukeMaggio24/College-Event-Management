import React, { useState, useEffect } from "react";
import "../App.css";
import HomeNavbar from "../components/HomeNavbar";
import EventCard from "../components/EventCard";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

// todo
// write functions for form submission
// fix collapse sharing state between EventCards

// fake list of events
const events = [
  {
    id: 1,
    university: "UCF",
    name: "Knight Hacks",
    visibility: "public",
    category: "tech talk",
    description: "come learn about java and have lazy moon pizza",
    date: "2022-01-01",
    starttime: "12:00",
    contactphone: "123-456-7890",
    contactemail: "coolman@ucf.edu",
    locationName: "UCF",
    locationLongitude: "28.6024",
    locationLatitude: "-81.2001",
  },
  {
    id: 2,
    university: "USF",
    name: "Hack@USF",
    visibility: "RSO Event",
    category: "Social",
    description: "come to the bowling alley and bowl",
    date: "2026-01-01",
    starttime: "12:01",
    contactphone: "123-456-7890",
    contactemail: "jeffdude@ucf.edu",
    locationName: "USF",
    locationLongitude: "28.06385",
    locationLatitude: "-82.41333",
  },
  {
    id: 3,
    university: "UF",
    name: "Hack@UF",
    visibility: "RSO Event",
    category: "Social",
    description: "testtestset",
    date: "2026-01-01",
    starttime: "12:01",
    contactphone: "123-456-7890",
    contactemail: "jeffdude@ucf.edu",
    locationName: "UF",
    locationLongitude: "28.06385",
    locationLatitude: "-82.41333",
  },
  {
    id: 4,
    university: "FSU",
    name: "Hack@Nole",
    visibility: "RSO Event",
    category: "Social",
    description: "comeGO NOLESwl",
    date: "2026-01-01",
    starttime: "12:01",
    contactphone: "123-456-7890",
    contactemail: "jeffdude@ucf.edu",
    locationName: "USF",
    locationLongitude: "28.06385",
    locationLatitude: "-82.41333",
  },
  {
    id: 5,
    university: "FIU",
    name: "Hack@FIU",
    visibility: "RSO Event",
    category: "Social",
    description: "owls?",
    date: "2026-01-01",
    starttime: "12:01",
    contactphone: "123-456-7890",
    contactemail: "jeffdude@ucf.edu",
    locationName: "USF",
    locationLongitude: "28.06385",
    locationLatitude: "-82.41333",
  },
  // Add more events as needed
];

function Home() {
  // filter events based on search term
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedUniversity, setSelectedUniversity] = useState(
    "Choose a University"
  );
  useEffect(() => {
    setFilteredEvents(
      events.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          event.university === selectedUniversity
      )
    );
  }, [searchTerm, events, selectedUniversity]);

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

  return (
    <div>
      <HomeNavbar />
      <div className="parent-div">
        <div style={{ display: "flex", alignItems: "center" }}>
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedUniversity}
            className="mr-2"
          >
            {universities.map((university) => (
              <Dropdown.Item
                key={university.id}
                onClick={() => setSelectedUniversity(university.name)}
              >
                {university.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <Form className="d-flex">
            <Form.Control
              id="searchBar"
              type="search"
              placeholder="Search Events"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </div>
      </div>

      <div className="event-card-container">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            university={event.university}
            name={event.name}
            visibility={event.visibility}
            category={event.category}
            description={event.description}
            date={event.date}
            starttime={event.starttime}
            contactphone={event.contactphone}
            contactemail={event.contactemail}
            locationName={event.locationName}
            locationLongitude={event.locationLongitude}
            locationLatitude={event.locationLatitude}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
