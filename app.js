import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";


import userRoute from "./src/routes/user.routes.js";
import adminRoute from "./src/routes/admin.routes.js"
import bookRoute from "./src/routes/book.routes.js"
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// XSS protection middleware
app.use(xssClean());

// MongoDB query sanitizer middleware
app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.send("Welcome to My Library Class");
});

// Define rate limiter options
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // maximum of 5 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  // keyGenerator: function (req, res) {
  //   // Generate a unique key using the user token (assuming it's stored in the request header)
  //   return req.headers.authorization || req.ip;
  // },
});

// Apply rate limiter middleware to endpoints matching the prefix
app.use("/api/v1/*", limiter);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/book", bookRoute);


export default app;