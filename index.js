import express from'express'
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
require("./config/db");

const app = express()

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
    console.log(`Server available on port: ${PORT}`)
})