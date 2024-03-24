import productModel from "../models/productDetails.js";
const PAGE_SIZE = 5;
export const monthlyData = async (matchQuery, page) => {
  const data1 = await productModel
    .aggregate([
      matchQuery,
      {
        $project: {
          _id: 1,
          id: 1,
          title: 1,
          price: 1,
          description: 1,
          category: 1,
          image: 1,
          sold: 1,
          dateOfSale: 1,
          month: 1,
        },
      },
    ])
    .skip(PAGE_SIZE * page)
    .limit(PAGE_SIZE);

  return data1;
};
