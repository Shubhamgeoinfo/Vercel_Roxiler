import productModel from "../models/productDetails.js";

export default async (monthParam) => {
  const data = await productModel.aggregate([
    {
      $project: {
        _id: 1,
        id: 1,
        price: 1,
        month: 1,
        priceRange: {
          $switch: {
            branches: [
              { case: { $lte: ["$price", 100] }, then: "0-100" },
              {
                case: {
                  $and: [{ $gt: ["$price", 100] }, { $lte: ["$price", 200] }],
                },
                then: "101-200",
              },
              {
                case: {
                  $and: [{ $gt: ["$price", 300] }, { $lte: ["$price", 400] }],
                },
                then: "301-400",
              },
              {
                case: {
                  $and: [{ $gt: ["$price", 400] }, { $lte: ["$price", 500] }],
                },
                then: "401-500",
              },
              {
                case: {
                  $and: [{ $gt: ["$price", 500] }, { $lte: ["$price", 600] }],
                },
                then: "501-600",
              },
              {
                case: {
                  $and: [{ $gt: ["$price", 600] }, { $lte: ["$price", 700] }],
                },
                then: "601-700",
              },
              {
                case: {
                  $and: [{ $gt: ["$price", 700] }, { $lte: ["$price", 800] }],
                },
                then: "701-800",
              },
              {
                case: {
                  $and: [{ $gt: ["$price", 800] }, { $lte: ["$price", 900] }],
                },
                then: "801-900",
              },
              // ... Add similar branches for other ranges up to 901-above
              { case: { $gt: ["$price", 900] }, then: "901-above" },
            ],
            default: "NA", // Default value if price doesn't fall into any range
          },
        },
      },
    },
    {
      $match: {
        month: { $eq: monthParam }, // Filter based on the month parameter
      },
    },
    {
      $group: {
        _id: "$priceRange", // Group by price range
        count: { $sum: 1 }, // Count documents in each range
      },
    },
  ]);

  return data;
};
