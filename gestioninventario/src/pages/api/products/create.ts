// pages/api/products/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if (req.method === "POST") {
        const { name, category, quantity, price, description } = req.body;

        try {
        const product = await prisma.product.create({
            data: { name, category, quantity, price, description },
        });
        res.status(201).json(product);
        } catch (error) {
        res.status(500).json({ error: "Error creating product" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
