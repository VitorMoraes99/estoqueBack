import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Rota para adicionar quantidade de um produto (entrada de estoque)
router.post("/entrada/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { quantity: { increment: quantity } },
  });

  res.json(product);
});

// Rota para subtrair quantidade de um produto (saída de estoque)
router.post("/saida/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { quantity: { decrement: quantity } },
  });

  res.json(product);
});

export default router;
