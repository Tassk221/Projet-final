const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "http://localhost:4000/api";

type ApiErrorPayload = {
  message?: string;
};

export type UserRole = "admin" | "client";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
  createdAt: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
};

export type UpdateProfilePayload = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
};

export type DashboardOverview = {
  stats: Array<{
    id: string;
    title: string;
    value: number;
    change: string;
    trend: "up" | "down";
  }>;
  totalUsers: {
    labels: string[];
    thisYear: number[];
    lastYear: number[];
  };
  trafficByDevice: {
    labels: string[];
    values: number[];
  };
  trafficByLocation: {
    labels: string[];
    values: number[];
  };
};

export type DashboardClient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
  createdAt: string;
};

type ApiRequestOptions = RequestInit & {
  token?: string;
};

const readPayload = async <T>(response: Response): Promise<T | ApiErrorPayload | null> => {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
};

const apiRequest = async <T>(path: string, init?: ApiRequestOptions): Promise<T> => {
  const { token, headers, ...rest } = init ?? {};

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {}),
    },
  });

  const payload = await readPayload<T>(response);

  if (!response.ok) {
    const message =
      (payload as ApiErrorPayload | null)?.message ??
      "Une erreur est survenue pendant la requete.";
    throw new Error(message);
  }

  return (payload as T) ?? ({} as T);
};

export const login = async (email: string, password: string) => {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const register = async (payload: RegisterPayload) => {
  return apiRequest<LoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const requestPasswordReset = async (email: string) => {
  return apiRequest<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const getCurrentUser = async (token: string) => {
  return apiRequest<{ user: AuthUser }>("/auth/me", { token });
};

export const updateCurrentUser = async (token: string, payload: UpdateProfilePayload) => {
  return apiRequest<{ user: AuthUser }>("/auth/me", {
    method: "PATCH",
    token,
    body: JSON.stringify(payload),
  });
};

export const getDashboardOverview = async (token: string) => {
  return apiRequest<DashboardOverview>("/dashboard/overview", { token });
};

export const getDashboardClients = async (token: string) => {
  return apiRequest<{ total: number; clients: DashboardClient[] }>("/dashboard/clients", { token });
};

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export const sendContactMessage = async (payload: ContactPayload) => {
  return apiRequest<{ message: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
