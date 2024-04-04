# TODO:
- table for rso_join_requests (implementation will be similar to rso_create_requests).<br>
- users table should be 3 seperate tables for student, admin, and super admin <br>
- comment and rating system for events?<br>
- ER diagram and relational schema<br>
- bcrypt password encryption<br>
- add ratings float to events table<br>
- add boolean for RSO table to see if that is true ( > 5 students means active)<br>
- create a Student modal to request to join an RSO, where that request is put into the database mentioned above.<br>
- create a Admin modal similar to ViewRsoCreateRequests.jsx to show students' requests to join an RSO.<br>
- table to store an RSO and its users.<br>
- screenshots of api<br>
- <br>
needed: Walkthrough of your application.
Demonstration of the current state of your database, including five users with different privileges, three Registered Student Organizations (RSOs), and one event per RSO.
Creation of a new user as an administrator.
Registration of a new user.
Logging in of the new user.
Creation of a new RSO.
Joining of the new user to the RSO, while an existing user leaves.
Creation of new events (RSO, private, public) with a demonstration of the implemented code for enforcing overlapping constraints.
Logging in of an existing user and access to events (public events, private events of the user's attending university, and events of RSOs the user is a member of).
Creation, viewing, modification, and deletion of comments.
Showcase of any additional features for bonus points.

# College-Event-Management
Allows for Universities to create university profiles. RSO owners to create events and for students to attend these events. These events can have various attributes such as public or private. With a google maps type of image for these locations as well a rating system.
<br>
https://webcourses.ucf.edu/courses/1448083/files/104489757?module_item_id=18008181

# Database:
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Student', 'Admin', 'Super Admin') NOT NULL
);

CREATE TABLE universities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  numOfStudents INT NOT NULL,
  description TEXT
);

CREATE TABLE events (
    id INT AUTO_INCREMENT,
    university_name VARCHAR(255),
    event_name VARCHAR(255),
    event_category VARCHAR(255),
    event_visibility VARCHAR(255),
    description TEXT,
    date VARCHAR(255),
    time VARCHAR(255),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    PRIMARY KEY (id)
);
