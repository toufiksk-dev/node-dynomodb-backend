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


// Quote Genarte Random 
const quotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The only thing we have to fear is fear itself.",
  "Success is not in what you have, but who you are.",
  "The best way to predict the future is to create it.",
];

app.get("/quote", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  res.json({ quote: randomQuote });
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});