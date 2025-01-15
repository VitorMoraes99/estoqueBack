import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  const { name, description, image, value, quantity } = req.body;
  const product = await prisma.product.create({
    data: { name, description, image, value, quantity },
  });
  res.json(product);
});

// Listar todos os produtos
router.get("/", async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Atualizar produto
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, image, value, quantity } = req.body;
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: { name, description, image, value, quantity },
  });
  res.json(product);
});

// Deletar produto
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id: Number(id) },
  });
  res.status(204).end();
});

export default router;
