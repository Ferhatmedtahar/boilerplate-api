import { authSwagger } from "./swaggerPaths/authSwagger";
import { productSwagger } from "./swaggerPaths/productSwagger";
import { userSwagger } from "./swaggerPaths/userSwagger";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "YOUR APP API docs",
    version: "1.0.0",
    description: "API documentation for your app.",
  },

  servers: [
    {
      url: `${process.env.BACKURL}:${process.env.PORT}`,
      description: "Local server",
    },
  ],
  paths: {
    ...userSwagger,
    ...authSwagger,
    ...productSwagger,
  },
};

// Options for the swagger docs
export const SwaggerOptions = {
  swaggerDefinition,
  apis: ["../routes/*.ts"],
};
