// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./database");

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(cors()); // Use cors middleware
app.use(express.json());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const signupRoute = require("./routes/signup.js");
const loginRoute = require("./routes/login.js");
const createUniRoute = require("./routes/createuni.js");
const fetchUniRoute = require("./routes/fetchunis.js");
const createEventRoute = require("./routes/createevent.js");
const fetchEventsRoute = require("./routes/fetchevents.js");
const rso_create_request = require("./routes/rso_create_request.js");
const fetchRsoRequests = require("./routes/fetchrsorequests.js");
const denyRequest = require("./routes/denyrequest.js");
// const acceptRequest = require("./routes/acceptrequest.js");

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/createuni", createUniRoute);
app.use("/fetchunis", fetchUniRoute);
app.use("/createevent", createEventRoute);
app.use("/fetchevents", fetchEventsRoute);
app.use("/rso_create_request", rso_create_request);
app.use("/fetchrsorequests", fetchRsoRequests);
app.use("/denyrequest", denyRequest);
// app.use("/acceptrequest", acceptRequest);

module.exports = db;
