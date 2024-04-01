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
