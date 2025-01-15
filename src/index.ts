import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import stockRoutes from "./routes/stockRoutes";
import userRoutes from "./routes/userRoutes";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/products", authMiddleware, productRoutes);
app.use("/users", userRoutes);
app.use("/stock", authMiddleware, stockRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
