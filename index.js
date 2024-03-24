import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import {
  getData,
  getmonthData,
  statData,
  bardata,
  pieData,
  allData,
} from "./controllers/product_controller.js";

//Configuring env file
dotenv.config();

//Databse config for connection to server
connectDB();

//Express Application
const app = express();
app.use(cors());
const PORT = process.env.port;

//allow json
app.use(express.json());
//allow data from url
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/test", (req, res) => {
  res.send("Hello Sent from Server to Frontend");
});

//GET Route
app.get("/", getData);
//This route is used to fetch data from URL
//and then send it to DB if data is not available in DB.
//then retrive all data from the Database and send it back to client.

//Get Route for each month
app.get("/month/:month", getmonthData);
//This controller response to monthly data
//from the database
//

//Get route for statistics
app.get("/stats/:month", statData);
//

//Get Route for bar chart
app.get("/bar/:month", bardata);

//Get Route for pie chart
app.get("/pie/:month", pieData);

//Get Route for all three route
app.get("/all/:month", allData);

//Express App listening on PORT
app.listen(PORT, () => {
  console.log(`Server is started and  Running Successfully on ${PORT}`);
});
