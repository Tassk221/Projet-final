import { randomUUID } from "node:crypto";
import { Router } from "express";
import { createSessionToken, hashPassword, verifyPassword } from "../utils/auth.js";
import { readDb, updateDb } from "../db/store.js";
import { toPublicUser } from "../utils/users.js";
import { authenticateSession } from "../middlewares/auth.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const name = String(req.body?.name ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");
    const phone = String(req.body?.phone ?? "").trim();
    const birthDate = String(req.body?.birthDate ?? "").trim();
    const address = String(req.body?.address ?? "").trim();
    const city = String(req.body?.city ?? "").trim();
    const country = String(req.body?.country ?? "").trim();

    if (!name || !email || !password || !phone || !birthDate || !address || !city || !country) {
      return res.status(400).json({
        message:
          "Nom, email, mot de passe, telephone, date de naissance, adresse, ville et pays sont requis.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caracteres." });
    }

    const db = await readDb();
    const emailAlreadyUsed = db.users.some((item) => item.email === email);

    if (emailAlreadyUsed) {
      return res.status(409).json({ message: "Cet email est deja utilise." });
    }

    const now = new Date().toISOString();
    const user = {
      id: randomUUID(),
      name,
      email,
      role: "client",
      phone,
      birthDate,
      address,
      city,
      country,
      passwordHash: hashPassword(password),
      createdAt: now,
    };
    const token = createSessionToken();

    await updateDb((current) => ({
      ...current,
      users: [...(current.users ?? []), user],
      sessions: [
        ...(current.sessions ?? []),
        {
          id: randomUUID(),
          userId: user.id,
          token,
          createdAt: now,
        },
      ],
    }));

    return res.status(201).json({
      token,
      user: toPublicUser(user),
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    const db = await readDb();
    const user = db.users.find((item) => item.email === email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ message: "Email ou mot de passe invalide." });
    }

    const token = createSessionToken();
    const now = new Date().toISOString();

    await updateDb((current) => ({
      ...current,
      sessions: [
        ...(current.sessions ?? []),
        {
          id: randomUUID(),
          userId: user.id,
          token,
          createdAt: now,
        },
      ],
    }));

    return res.json({
      token,
      user: toPublicUser(user),
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    const email = String(req.body?.email ?? "").trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email requis." });
    }

    const db = await readDb();
    const user = db.users.find((item) => item.email === email);

    if (user) {
      const now = new Date().toISOString();
      await updateDb((current) => ({
        ...current,
        resetRequests: [
          ...(current.resetRequests ?? []),
          {
            id: randomUUID(),
            userId: user.id,
            email: user.email,
            token: createSessionToken(),
            createdAt: now,
          },
        ],
      }));
    }

    return res.json({
      message: "Si ce compte existe, un email de reinitialisation a ete envoye.",
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/me", authenticateSession, async (req, res, next) => {
  try {
    const db = await readDb();
    const user = (db.users ?? []).find((item) => item.id === req.auth.user.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    return res.json({ user: toPublicUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.patch("/me", authenticateSession, async (req, res, next) => {
  try {
    const incomingName = req.body?.name;
    const incomingEmail = req.body?.email;
    const incomingPhone = req.body?.phone;
    const incomingBirthDate = req.body?.birthDate;
    const incomingAddress = req.body?.address;
    const incomingCity = req.body?.city;
    const incomingCountry = req.body?.country;

    const hasAnyField =
      incomingName !== undefined ||
      incomingEmail !== undefined ||
      incomingPhone !== undefined ||
      incomingBirthDate !== undefined ||
      incomingAddress !== undefined ||
      incomingCity !== undefined ||
      incomingCountry !== undefined;

    if (!hasAnyField) {
      return res.status(400).json({
        message: "Aucune information a mettre a jour.",
      });
    }

    const db = await readDb();
    const currentUser = (db.users ?? []).find((item) => item.id === req.auth.user.id);

    if (!currentUser) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    const name = incomingName === undefined ? currentUser.name : String(incomingName).trim();
    const email =
      incomingEmail === undefined
        ? currentUser.email
        : String(incomingEmail).trim().toLowerCase();
    const phone = incomingPhone === undefined ? currentUser.phone ?? "" : String(incomingPhone).trim();
    const birthDate =
      incomingBirthDate === undefined ? currentUser.birthDate ?? "" : String(incomingBirthDate).trim();
    const address = incomingAddress === undefined ? currentUser.address ?? "" : String(incomingAddress).trim();
    const city = incomingCity === undefined ? currentUser.city ?? "" : String(incomingCity).trim();
    const country = incomingCountry === undefined ? currentUser.country ?? "" : String(incomingCountry).trim();

    if (!name || !email || !phone || !birthDate || !address || !city || !country) {
      return res.status(400).json({
        message: "Nom, email, telephone, date de naissance, adresse, ville et pays sont requis.",
      });
    }

    const emailAlreadyUsed = (db.users ?? []).some(
      (item) => item.id !== currentUser.id && item.email === email
    );

    if (emailAlreadyUsed) {
      return res.status(409).json({ message: "Cet email est deja utilise." });
    }

    const updatedUser = {
      ...currentUser,
      name,
      email,
      phone,
      birthDate,
      address,
      city,
      country,
    };

    await updateDb((current) => ({
      ...current,
      users: (current.users ?? []).map((item) => (item.id === currentUser.id ? updatedUser : item)),
    }));

    return res.json({ user: toPublicUser(updatedUser) });
  } catch (error) {
    return next(error);
  }
});

export default router;
