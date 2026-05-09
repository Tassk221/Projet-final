import { randomUUID } from "node:crypto";
import { Router } from "express";
import { updateDb } from "../db/store.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const firstName = String(req.body?.firstName ?? "").trim();
    const lastName = String(req.body?.lastName ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const message = String(req.body?.message ?? "").trim();

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        message: "Tous les champs sont requis.",
      });
    }

    await updateDb((current) => ({
      ...current,
      contactMessages: [
        ...(current.contactMessages ?? []),
        {
          id: randomUUID(),
          firstName,
          lastName,
          email,
          message,
          createdAt: new Date().toISOString(),
        },
      ],
    }));

    return res.status(201).json({ message: "Message recu. Merci." });
  } catch (error) {
    return next(error);
  }
});

export default router;
