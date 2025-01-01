import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
//  importing the swagger ui and swagger ui docs
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SwaggerOptions } from "./services/swagger";

import { globalErrorHandler } from "./controllers/error.controller";
import apiRoutes from "./routes/index";
import { AppError } from "./utils/appError";
//  eslint-disable-next-line
const xss: any = require("xss-clean");
dotenv.config();

export const app = express();

app.use(helmet());

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: "to much requests from this IP , please try again after 1h.",
});

app.use("/api", limiter);

app.use(mongoSanitize());

app.use(xss());
app.use(express.static("src/public"));

app.use("/api/v1", apiRoutes);

//! api docs with swagger

const spacs = swaggerDoc(SwaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));

//  ! handle the undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
