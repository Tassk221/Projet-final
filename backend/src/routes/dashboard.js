import { Router } from "express";
import { readDb } from "../db/store.js";
import { requireAdmin } from "../middlewares/auth.js";
import { getUserRole, toAdminClientView } from "../utils/users.js";

const router = Router();

router.get("/overview", async (req, res, next) => {
  try {
    const db = await readDb();
    return res.json(db.dashboard);
  } catch (error) {
    return next(error);
  }
});

router.get("/clients", requireAdmin, async (req, res, next) => {
  try {
    const db = await readDb();
    const clients = (db.users ?? [])
      .filter((user) => getUserRole(user) === "client")
      .map((user) => toAdminClientView(user));

    return res.json({
      total: clients.length,
      clients,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
