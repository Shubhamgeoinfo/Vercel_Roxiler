import productModel from "../models/productDetails.js";
import axios from "axios";
import { statsdataService } from "../services/stats_data.js";
import bar_data from "../services/bar_data.js";
import pie_data from "../services/pie_data.js";
import { monthlyData } from "../services/month_data.js";

// import bar_data from "../services/bar_data.js";

const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

// First controller for fetching data and save it to Database
export const getData = async (req, res) => {
  try {
    //res.send("Working on get request");
    const existingData = await productModel.find();
    //console.log(existingData);
    if (existingData.length === 0) {
      const response = await axios.get(url);
      const jsonData = response.data;
      for (const productData of jsonData) {
        const {
          id,
          title,
          price,
          description,
          category,
          image,
          sold,
          dateOfSale,
        } = productData;
        await new productModel({
          id,
          title,
          price,
          description,
          category,
          image,
          sold,
          dateOfSale,
          month: new Date(dateOfSale).getMonth(),
        }).save();
      }
      console.log("All Data saved to database successfully!");
      res.status(201).json({ message: "All Data saved successfully" });
    } else {
      console.log("Data Exists Already");
    }
    //Retrive the data from backend and send it to frontend
    res.status(200).json(existingData);
  } catch (error) {
    console.error("Error fetching or saving data:", error);
    res
      .status(500)
      .send({ sucess: false, message: "Error fetching or saving data" });
  }
};

//Second controller for getting month data

export const getmonthData = async (req, res) => {
  //res.send("Data for month");
  try {
    const monthParam = parseInt(req.params.month); // Get the month parameter
    const page = parseInt(req.query.page || "0");

    const search = req.query.search || "";

    const matchQuery =
      search !== ""
        ? {
            $match: {
              $and: [
                { month: { $eq: monthParam } },
                {
                  $or: [
                    { title: { $regex: `.*${search}.*` } },
                    { description: { $regex: `.*${search}.*` } },
                    { price: { $regex: `.*${search}.*` } },
                  ],
                },
              ],
            },
          }
        : { $match: { month: { $eq: monthParam } } };
    // console.log({ matchQuery, search, page });

    //safety Check for month <1 and >12
    if (isNaN(monthParam) || monthParam < 0 || monthParam > 11) {
      return res.status(400).json({ message: "Invalid month parameter" });
    }
    const totalCount = await productModel.aggregate([
      matchQuery,
      {
        $count: "count",
      },
    ]);

    const data1 = monthlyData(matchQuery, page);
    data1.then((data) => {
      res.status(200).json({ data, totalCount });
    });
  } catch (error) {
    console.log("Error in retriving monthly data", error);
    res
      .status(500)
      .send({ success: false, message: "Error in retriving monthly data" });
  }
};

//Third Controller for monthly stats summay
export const statData = async (req, res) => {
  try {
    const monthParam = parseInt(req.params.month); // Get the month parameter

    console.log(monthParam);
    //safety Check for month <1 and >12
    if (isNaN(monthParam) || monthParam < 0 || monthParam > 11) {
      return res.status(400).json({ message: "Invalid month parameter" });
    }
    const data2 = statsdataService(monthParam);
    data2.then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    console.log(
      "Error in retriving monthly statistics data for summary",
      error
    );
    res.status(500).send({
      success: false,
      message: "Error in retriving monthly statistics data for summary",
    });
  }
};

//Fourth Controller for monthly stats
export const bardata = async (req, res) => {
  try {
    //res.send("Stats Data for Bar chart from month");
    const monthParam = parseInt(req.params.month); // Get the month parameter

    console.log(monthParam);
    //safety Check for month <1 and >12
    if (isNaN(monthParam) || monthParam < 0 || monthParam > 11) {
      return res.status(400).json({ message: "Invalid month parameter" });
    }
    const data2 = bar_data(monthParam);
    data2.then((data) => {
      console.log({ data });
      res.status(200).json(data);
    });
  } catch (error) {
    console.log(
      "Error in retriving monthly statistics  for plotting bar Graph",
      error
    );
    res.status(500).send({
      success: false,
      message: "Error in retriving monthly statistics data for bar chart",
    });
  }
};

//Fifth Controller for monthly pie data for category
export const pieData = async (req, res) => {
  try {
    const monthParam = parseInt(req.params.month); // Get the month parameter

    console.log(monthParam);
    //safety Check for month <1 and >12
    if (isNaN(monthParam) || monthParam < 0 || monthParam > 11) {
      return res.status(400).json({ message: "Invalid month parameter" });
    }
    const data = pie_data(monthParam);
    data.then((res_data) => {
      res.status(200).json(res_data);
    });
  } catch (error) {
    console.log(
      "Error in retriving monthly statistics  for plotting pie Graph",
      error
    );
    res.status(500).send({
      success: false,
      message: "Error in retriving monthly statistics data for pie chart",
    });
  }
};

export const allData = async (req, res) => {
  try {
    const monthParam = parseInt(req.params.month); // Get the month parameter

    console.log(monthParam);
    //safety Check for month <1 and >12
    if (isNaN(monthParam) || monthParam < 0 || monthParam > 11) {
      return res.status(400).json({ message: "Invalid month parameter" });
    }
    const pieData = pie_data(monthParam);
    const statsData = statsdataService(monthParam);
    const barData = bar_data(monthParam);
    Promise.all([pieData, statsData, barData]).then((values) => {
      res
        .status(200)
        .json({ pieData: values[0], statsData: values[1], barData: values[2] });
    });
  } catch (error) {
    console.log(
      "Error in retriving monthly statistics  for plotting pie Graph",
      error
    );
    res.status(500).send({
      success: false,
      message: "Error in retriving monthly statistics data for pie chart",
    });
  }
};
