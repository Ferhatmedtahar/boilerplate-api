import Joi from "joi";

const nameRule = Joi.string().min(1).max(50).required().messages({
  "string.empty": "Product name is required",
  "string.min": "Product name must be at least 1 characters long",
  "string.max": "Product name must be less than 50 characters long",
});

const categoryRule = Joi.string()
  .valid(
    "Protien Powders",
    "Healthy Fats",
    "Fat Burners",
    "Amino Acids",
    "Creatine",
    "Vitamins and Minerals",
    "Other Supplements",
    "Fitness Food",
    "Sportswear",
    "Workout Accessories"
  )
  .required()
  .messages({
    "any.only": "Only these categories are available",
    "string.empty": "A product must have a category",
  });

// Schema for creating and updating a new product
export const checkProductSchema = Joi.object({
  name: nameRule,
  category: categoryRule,
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  summary: Joi.string().optional().allow("").messages({
    "string.empty": "Summary can be an empty string",
  }),
  usage: Joi.string().optional().allow("").messages({
    "string.empty": "Usage can be an empty string",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a positive number",
    "number.empty": "Price is required",
  }),
  discount: Joi.number().min(0).max(1).optional().messages({
    "number.base": "Discount must be a number",
    "number.min": "Discount cannot be negative",
    "number.max": "Discount cannot exceed 1",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Stock must be a non-negative integer",
    "number.empty": "Stock is required",
  }),
  images: Joi.array()
    .items(Joi.string()) // Ensure that each item in the array is a string (file reference)
    .optional()
    .messages({
      "array.base": "Images must be an array of strings",
      "string.base": "Each image must be a string reference to a file",
    }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(1).max(50).optional().messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 1 characters long",
    "string.max": "Product name must be less than 50 characters long",
  }),
  category: Joi.string()
    .valid(
      "Protien Powders",
      "Healthy Fats",
      "Fat Burners",
      "Amino Acids",
      "Creatine",
      "Vitamins and Minerals",
      "Other Supplements",
      "Fitness Food",
      "Sportswear",
      "Workout Accessories"
    )
    .optional()
    .messages({
      "any.only": "Only these categories are available",
      "string.empty": "A product must have a category",
    }),
  description: Joi.string().optional().messages({
    "string.empty": "Description is required",
  }),
  summary: Joi.string().optional().allow("").messages({
    "string.empty": "Summary can be an empty string",
  }),
  usage: Joi.string().optional().allow("").messages({
    "string.empty": "Usage can be an empty string",
  }),
  price: Joi.number().positive().optional().messages({
    "number.base": "Price must be a positive number",
    "number.empty": "Price is required",
  }),
  discount: Joi.number().min(0).max(1).optional().messages({
    "number.base": "Discount must be a number",
    "number.min": "Discount cannot be negative",
    "number.max": "Discount cannot exceed 1",
  }),
  stock: Joi.number().integer().min(0).optional().messages({
    "number.base": "Stock must be a non-negative integer",
    "number.empty": "Stock is required",
  }),
  images: Joi.array()
    .items(Joi.string()) // Ensure that each item in the array is a string (file reference)
    .optional()
    .messages({
      "array.base": "Images must be an array of strings",
      "string.base": "Each image must be a string reference to a file",
    }),
});
