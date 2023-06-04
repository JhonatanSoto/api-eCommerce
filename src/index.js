import express from "express";
import { mongoConnection } from "./database/config/connection.js";
import dotenv from "dotenv";
import authRouters from "./routers/authRouters.js";
import userRouters from "./routers/userRouters.js";
import brandRouter from "./routers/brandRouters.js";
import categoryRouters from "./routers/categoryRouters.js";
import subcategoryRouters from "./routers/subcategoryRouters.js";
import fileRouters from "./routers/fileRouters.js";
import productRouters from "./routers/productRouters.js";
import cors from "cors";

dotenv.config();
mongoConnection();

const PORT = process.env.PORT || 3030;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: 'GET,POST,PUT,DELETE'
  })
);

app.use("/api/user", authRouters);
app.use("/api/user", userRouters);
app.use("/api/brands", brandRouter);
app.use("/api/categories", categoryRouters);
app.use("/api/subcategories", subcategoryRouters);
app.use("/api/files",fileRouters);
app.use("/api/products",productRouters);

app.listen(PORT, (_) => {
  console.log("Server running in port:" + PORT);
});
