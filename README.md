>
<br>
needed: <br>Walkthrough of your application.✅<br>
Demonstration of the current state of your database, including five users with different privileges, three Registered Student Organizations (RSOs), and one event per RSO.✅<br>
Creation of a new user as an administrator.✅<br>
Registration of a new user.✅<br>
Logging in of the new user.✅<br>
Creation of a new RSO.✅<br>
Joining of the new user to the RSO, while an existing user leaves.✅<br>
Creation of new events (RSO, private, public) with a demonstration of the implemented code for enforcing overlapping constraints.✅<br>
Logging in of an existing user and access to events (public events, private events of the user's attending university, and events of RSOs the user is a member of).✅<br>
Creation, viewing, modification, and deletion of comments.✅<br>
Showcase of any additional features for bonus points.✅<br>
<br>
# College-Event-Management
Allows for Universities to create university profiles. RSO owners to create events and for students to attend these events. These events can have various attributes such as public or private. With a google maps type of image for these locations as well a rating system.
<br>
https://webcourses.ucf.edu/courses/1448083/files/104489757?module_item_id=18008181

# Database:
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Student', 'Admin', 'Super Admin') NOT NULL,
  university VARCHAR(255),
  rso VARCHAR(255)
);


CREATE TABLE universities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  numOfStudents INT NOT NULL,
  university_domain VARCHAR(255) NOT NULL,
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
    rso_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE rso_create_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    rso_name VARCHAR(255),
    administrator_email VARCHAR(255),
    emails TEXT,
    initialNumOfMembers INT,
    UNI_id INT,
    FOREIGN KEY(UNI_ID) REFERENCES universities(id)
);

CREATE TABLE RSO (
rso_id INT AUTO_INCREMENT PRIMARY KEY,
rso_owner_id INT,
rso_name VARCHAR(255),
administrator_email VARCHAR(255),
member_emails TEXT,
numOfMembers INT,
active BOOLEAN,
UNI_id INT,
FOREIGN KEY (UNI_id) REFERENCES universities(id),
FOREIGN KEY (rso_owner_id) REFERENCES users(id)
);


CREATE TABLE comments (
  id INT AUTO_INCREMENT,
  event_id INT,
  user_id INT,
  comment TEXT,
  rating INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE rso_join_request (
id INT AUTO_INCREMENT PRIMARY KEY, 
rso_name VARCHAR(255),
email TEXT
); 
