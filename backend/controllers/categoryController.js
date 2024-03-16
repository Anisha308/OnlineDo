import Category from "../models/categoryModel.js";

import asyncHandler from "express-async-handler";

const addCategories = asyncHandler(async (req, res) => {
  try {
    const { categoryName, description, liststatus } = req.body;
    console.log(categoryName,description,liststatus,'statuuss');
     const existingCategory = await Category.findOne({ categoryName });
console.log(existingCategory);
    if (existingCategory) {
       // If the category already exists, return an error response
       return res.status(400).json({ error: "Category already exists" });
    }
   
    const newCategory = await Category.create({
      categoryName,
      description,
      liststatus,
    });
    console.log(newCategory,'newcategoryt');
    const savedCategory = await newCategory.save();
    console.log(savedCategory,'savedCategory');
    res.status(200).json(savedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const pageSize = 6;
    const skip = (page - 1) * pageSize;

    const categories = await Category.find().skip(skip).limit(pageSize);

    const totalCategories = await Category.countDocuments(); // Corrected to count categories
    const totalPages = Math.ceil(totalCategories / pageSize);

    res.status(200).json({
      categories,
      pagination: {
        currentPage: page,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export { getCategories, addCategories };
