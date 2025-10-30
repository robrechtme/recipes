import { NextApiRequest, NextApiResponse } from "next";
import { getRecipes } from "@core/recipes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(204).end();
  }
  if (req.method === "GET") {
    const recipes = await getRecipes();
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(200).json(recipes);
  }
  res.setHeader("Allow", "GET, OPTIONS");
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
