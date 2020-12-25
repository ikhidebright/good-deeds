import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import passport from "passport";
import createError from "http-errors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import apiRoutes from "./routes/index.routes";

const swaggerDocument = require("./swagger.json");
// swagger setUp

require("./config/db");

dotenv.config();

const app = express();

app.use("/documents", express.static("documents"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRoutes);

app.get("/", (request, response) => {
  response.status(200).json({
    status: true,
    message: "This is the API for the good deeds project by NRA",
  });
});

app.use((request, response, next) => {
  next(createError.NotFound());
});

app.use((err, request, response, next) => {
  response.status(err.status || 500);
  response.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server available on port: ${PORT}`);
});
