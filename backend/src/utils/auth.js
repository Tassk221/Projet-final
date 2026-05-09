import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const hashPassword = (password) => {
  return createHash("sha256").update(password).digest("hex");
};

export const verifyPassword = (password, storedHash) => {
  const passwordHash = hashPassword(password);
  const left = Buffer.from(passwordHash, "utf8");
  const right = Buffer.from(storedHash, "utf8");

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
};

export const createSessionToken = () => {
  return randomBytes(32).toString("hex");
};
