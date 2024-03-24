import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
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
