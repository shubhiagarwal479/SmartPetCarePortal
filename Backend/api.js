// src/services/api.js
// ─────────────────────────────────────────────────────────────────────────────
//  PawCare Portal — Frontend API Service
//  Drop this file into your React src/services/ folder.
//  All fetch calls to the Express backend are centralised here.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ── Helper: generic fetch wrapper ─────────────────────────────────────────────
async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers:     { "Content-Type": "application/json", ...options.headers },
    credentials: "include",   // send session cookie with every request
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json();

  if (!response.ok) {
    // Throw a structured error so callers can display the message
    const error = new Error(data.message || "Request failed");
    error.errors = data.errors || [];
    error.status = response.status;
    throw error;
  }

  return data;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  AUTH API
// ═══════════════════════════════════════════════════════════════════════════════

export const authAPI = {
  // POST /api/auth/signup
  signup: (name, email, password) =>
    request("/auth/signup", { method: "POST", body: { name, email, password } }),

  // POST /api/auth/login
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password } }),

  // POST /api/auth/logout
  logout: () =>
    request("/auth/logout", { method: "POST" }),

  // GET /api/auth/me  (check active session on page reload)
  me: () =>
    request("/auth/me")
};

// ═══════════════════════════════════════════════════════════════════════════════
//  VISITS API
// ═══════════════════════════════════════════════════════════════════════════════

export const visitAPI = {
  // POST /api/visits/search  — dual-key lookup (guest accessible)
  search: (visitId, ownerId) =>
    request("/visits/search", { method: "POST", body: { visitId, ownerId } }),

  // PUT /api/visits/:visitId/update  — business-rule-gated update (auth required)
  update: (visitId, visitTime, serviceType) =>
    request(`/visits/${visitId}/update`, {
      method: "PUT",
      body:   { visitTime, serviceType }
    }),

  // GET /api/visits/:visitId  — re-fetch single record
  getOne: (visitId) =>
    request(`/visits/${visitId}`)
};

// ═══════════════════════════════════════════════════════════════════════════════
//  USER API
// ═══════════════════════════════════════════════════════════════════════════════

export const userAPI = {
  // GET /api/users/profile
  getProfile: () => request("/users/profile"),

  // PUT /api/users/profile
  updateProfile: (name) =>
    request("/users/profile", { method: "PUT", body: { name } })
};
