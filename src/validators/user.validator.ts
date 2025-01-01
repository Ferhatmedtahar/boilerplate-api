import Joi from "joi";

const nameRule = Joi.string().min(2).max(40).required().messages({
  "string.max": "A user name must be below 40 characters",
  "string.min": "A user name must be more than 2 characters",
  "string.empty": "Name is required",
});

const emailRule = Joi.string().email().lowercase().required().messages({
  "string.email": "Please provide a valid email",
  "string.empty": "Email is required",
});

const passwordRule = Joi.string().min(8).required().messages({
  "string.min": "Password must be at least 8 characters",
  "string.empty": "Password is required",
});

const passwordConfirmRule = Joi.string()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "Password and confirm password must match",
    "string.empty": "Password confirm is required",
  });

// Sign-up schema
export const signUpSchema = Joi.object({
  name: nameRule,
  email: emailRule,
  password: passwordRule,
  passwordConfirm: passwordConfirmRule,
});

// Login schema
export const loginSchema = Joi.object({
  email: emailRule,
  password: passwordRule,
});

// Forgot password schema
export const forgotPasswordSchema = Joi.object({
  email: emailRule,
});

// Reset password schema
export const resetPasswordSchema = Joi.object({
  password: passwordRule,
  passwordConfirm: passwordConfirmRule,
});

// Update password schema
export const updatePasswordSchema = Joi.object({
  currentPassword: passwordRule,
  password: passwordRule,
  passwordConfirm: passwordConfirmRule,
});

// Update user info (profile) schema
export const updateMeSchema = Joi.object({
  name: nameRule,
  email: emailRule,
  photo: Joi.string().optional(),
});
