import productModel from "../models/productDetails.js";
export default async (monthParam) => {
  const data4 = await productModel.aggregate([
    {
      $project: {
        _id: 1, // Include these fields if you need them in the response
        id: 1,
        category: 1,
        month: 1, // Extract month for grouping
      },
    },
    {
      $match: {
        month: { $eq: monthParam }, // Filter based on the month parameter
      },
    },
    {
      $group: {
        _id: "$category", // Group by category
        count: { $sum: 1 }, // Count documents in each category
      },
    },
  ]);

  const formattedData = data4.map((item) => ({
    category: item._id,
    count: item.count,
  }));
  return formattedData;
};
