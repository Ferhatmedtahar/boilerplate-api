import { ObjectSchema } from "joi";

import { NextFunction, Request, Response } from "express";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error)
      res.status(400).json({
        status: "failed",
        error: error.details.map((err) => err.message),
      });

    req.body = value;
    next();
  };
};
