import cors from "cors";
import express from "express";
import { FRONTEND_ORIGINS, PORT } from "./config.js";
import { ensureDb } from "./db/store.js";
import { authenticateSession } from "./middlewares/auth.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import contactRoutes from "./routes/contact.js";

await ensureDb();

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (FRONTEND_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed."));
    },
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", authenticateSession, dashboardRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message, err.stack);
  res.status(500).json({ message: "Erreur serveur interne.", error: err.message });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable." });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
