import { readDb } from "../db/store.js";
import { getUserRole } from "../utils/users.js";

const getBearerToken = (authorizationHeader) => {
  if (!authorizationHeader) {
    return "";
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return "";
  }

  return token.trim();
};

export const authenticateSession = async (req, res, next) => {
  try {
    const token = getBearerToken(req.headers.authorization);

    if (!token) {
      return res.status(401).json({ message: "Authentification requise." });
    }

    const db = await readDb();
    const session = (db.sessions ?? []).find((item) => item.token === token);

    if (!session) {
      return res.status(401).json({ message: "Session invalide ou expiree." });
    }

    const user = (db.users ?? []).find((item) => item.id === session.userId);

    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable pour cette session." });
    }

    req.auth = {
      token,
      session,
      user: {
        ...user,
        role: getUserRole(user),
      },
    };

    return next();
  } catch (error) {
    return next(error);
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.auth?.user?.role !== "admin") {
    return res.status(403).json({ message: "Acces reserve a l'administrateur." });
  }

  return next();
};
