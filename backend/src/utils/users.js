export const ADMIN_EMAIL = "admin@fitclub.com";
export const ADMIN_ID = "user_admin";

export const getUserRole = (user) => {
  if (!user) {
    return "client";
  }

  if (user.role === "admin" || user.id === ADMIN_ID || user.email === ADMIN_EMAIL) {
    return "admin";
  }

  return "client";
};

export const toPublicUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: getUserRole(user),
    phone: user.phone ?? "",
    birthDate: user.birthDate ?? "",
    address: user.address ?? "",
    city: user.city ?? "",
    country: user.country ?? "",
    createdAt: user.createdAt ?? "",
  };
};

export const toAdminClientView = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    birthDate: user.birthDate ?? "",
    address: user.address ?? "",
    city: user.city ?? "",
    country: user.country ?? "",
    createdAt: user.createdAt ?? "",
  };
};
