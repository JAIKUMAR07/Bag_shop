// Import required modules
const express = require("express"); // Express framework
const app = express(); // Create an Express application
const port = 3000; // Define the port where the server will run
const cookiesParser = require("cookie-parser"); // Middleware to parse cookies
const path = require("path"); // Module for handling and transforming file paths

// Import route handlers
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

// Import database connection (mongoose)
const db = require("./config/mongoose-connection");

// -------------------- MIDDLEWARES -------------------- //

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies from the request headers
app.use(cookiesParser());

// Serve static files (CSS, JS, images, etc.) from the "views" folder
app.use(express.static(path.join(__dirname, "views")));

// -------------------- VIEW ENGINE -------------------- //

// Set "views" directory for template files
app.set("views", path.join(__dirname, "views"));

// Set EJS as the template engine
app.set("view engine", "ejs");

// -------------------- ROUTES -------------------- //

// Mount routers for different parts of the app
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!"); // Send plain text response
});

// -------------------- SERVER -------------------- //

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
