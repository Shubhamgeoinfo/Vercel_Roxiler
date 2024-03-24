import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://shubhamgeoinfo:QHEWvcyuf1wqfpbb@cluster0.9tw8rlp.mongodb.net/roxiler"
    );
    console.log(
      `Server is Conneted To Mongodb Databse and ready for CRUD operation ${conn.connection.host}`
    );
  } catch (error) {
    console.log(
      `Connection Error found  in db file during connection to Database ${error}`
    );
  }
};

export default connectDB;
