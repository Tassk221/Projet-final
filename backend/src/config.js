const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const parseOrigins = (value) => {
  if (!value) {
    return defaultOrigins;
  }

  const origins = value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins.length > 0 ? origins : defaultOrigins;
};

export const PORT = Number.parseInt(process.env.PORT ?? "4100", 10);
export const FRONTEND_ORIGINS = parseOrigins(process.env.FRONTEND_ORIGINS);
