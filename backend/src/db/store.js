import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hashPassword } from "../utils/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbFilePath = resolve(__dirname, "../../data/db.json");

const createDefaultDashboard = () => ({
  stats: [
    { id: "views", title: "Views", value: 7232, change: "+11.2%", trend: "up" },
    { id: "visits", title: "Visits", value: 3537, change: "+2.2%", trend: "up" },
    { id: "newUsers", title: "New Users", value: 396, change: "+3.7%", trend: "up" },
    { id: "activeUsers", title: "Active Users", value: 1232, change: "+4.3%", trend: "up" },
  ],
  totalUsers: {
    labels: ["Jan", "Fev", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    thisYear: [43000, 10000, 43200, 34940, 34039, 30420, 21109, 29393, 22943, 39309, 95765, 3594],
    lastYear: [53440, 33340, 52340, 38393, 48385, 38572, 22594, 99284, 93348, 23942, 34928, 34953],
  },
  trafficByDevice: {
    labels: ["Linux", "Mac", "iOS", "Windows", "Android", "Other"],
    values: [41000, 10040, 24200, 20324, 60953, 32452],
  },
  trafficByLocation: {
    labels: ["Senegal", "Guinee", "Gambie", "Other"],
    values: [42, 23, 14, 21],
  },
});

const createDefaultDb = () => ({
  users: [
    {
      id: "user_admin",
      name: "Admin FitClub",
      email: "admin@fitclub.com",
      role: "admin",
      phone: "+221000000000",
      birthDate: "1990-01-01",
      address: "SICAP Mermoz",
      city: "Dakar",
      country: "Senegal",
      passwordHash: hashPassword("admin123"),
      createdAt: new Date().toISOString(),
    },
  ],
  sessions: [],
  resetRequests: [],
  contactMessages: [],
  dashboard: createDefaultDashboard(),
});

export const ensureDb = async () => {
  try {
    await access(dbFilePath, fsConstants.F_OK);
  } catch {
    await mkdir(dirname(dbFilePath), { recursive: true });
    await writeFile(dbFilePath, `${JSON.stringify(createDefaultDb(), null, 2)}\n`, "utf8");
  }
};

export const readDb = async () => {
  await ensureDb();
  const raw = await readFile(dbFilePath, "utf8");
  return JSON.parse(raw);
};

export const writeDb = async (data) => {
  await writeFile(dbFilePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
};

export const updateDb = async (updater) => {
  const current = await readDb();
  const next = await updater(current);
  await writeDb(next);
  return next;
};
