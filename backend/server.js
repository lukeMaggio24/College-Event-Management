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
const fetchuni_id = require("./routes/fetchuni_id.js");
const fetch_uni_domain = require("./routes/fetch_uni_domain");
const fetchComments = require("./routes/fetchcomments.js");
const addcomment = require("./routes/addcomment.js");
const deleteComment = require("./routes/deletecomment.js");
const editComment = require("./routes/editcomment.js");
const acceptrequest = require("./routes/acceptrequest.js");
const fetch_user_id_byEmail = require("./routes/fetch_user_id_byEmail.js");
const fetchrso = require("./routes/fetchrso.js");
const accept_RSO_join_request = require("./routes/accept_RSO_join_request.js");
const deny_RSO_join_request = require("./routes/deny_RSO_join_request.js");
const fetch_RSO_join_request = require("./routes/fetch_RSO_join_request.js");
const leaverso = require("./routes/leaverso.js");
const fetch_RSO_time = require("./routes/fetch_RSO_time.js");
const joinRso = require("./routes/request_to_join_RSO.js");

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/createuni", createUniRoute);
app.use("/fetchunis", fetchUniRoute);
app.use("/createevent", createEventRoute);
app.use("/fetchevents", fetchEventsRoute);
app.use("/rso_create_request", rso_create_request);
app.use("/fetchrsorequests", fetchRsoRequests);
app.use("/denyrequest", denyRequest);
app.use("/fetchuni_id", fetchuni_id);
app.use("/fetch_uni_domain", fetch_uni_domain);
app.use("/fetchcomments", fetchComments);
app.use("/addcomment", addcomment);
app.use("/deletecomment", deleteComment);
app.use("/editcomment", editComment);
app.use("/acceptrequest", acceptrequest);
app.use("/fetch_user_id_byEmail", fetch_user_id_byEmail);
app.use("/fetchrso", fetchrso);
app.use("/accept_RSO_join_request", accept_RSO_join_request);
app.use("/deny_RSO_join_request", deny_RSO_join_request);
app.use("/fetch_RSO_join_request", fetch_RSO_join_request);
app.use("/leaverso", leaverso);
app.use("/fetch_RSO_time", fetch_RSO_time);
app.use("/request_to_join_RSO", joinRso);

module.exports = db;
