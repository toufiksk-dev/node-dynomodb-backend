import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contacts.js";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contacts", contactRoutes);
app.use("/products", productRoutes);
app.get("/", (req, res) => {
  res.send("DynamoDB Node API Server is okay.. ");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});