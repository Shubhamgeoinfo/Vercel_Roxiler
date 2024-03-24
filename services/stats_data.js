import productModel from "../models/productDetails.js";
export const statsdataService = async (monthParam) => {
  const data2 = await productModel.aggregate([
    {
      $project: {
        _id: 1,
        id: 1,
        price: 1,
        sold: 1,
        dateOfSale: 1,
        month: 1,
      },
    },
    {
      $match: {
        month: { $eq: monthParam }, // Filter based on the month parameter
      },
    },
    {
      $group: {
        _id: "$month", // Group by month
        totalSoldPrice: {
          $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] },
        }, // Sum price only for sold items

        totalSoldCount: { $sum: { $convert: { input: "$sold", to: "int" } } },
        totalNotSoldCount: {
          $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] },
        }, // Count total not sold (false) values
      },
    },
  ]);

  return data2;
};
