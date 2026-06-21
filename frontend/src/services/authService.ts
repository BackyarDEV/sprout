import type { AuthFormState } from "../types/Auth";

export async function login(form: AuthFormState) {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 500));
  if (!form.username || !form.password || form.username !== 'admin' && form.password !== 'err0r.4O4') {
    throw new Error("Invalid credentials");
  }

  // Return a fake token and user object
  return {
    token: "fake-token",
    user: { username: form.username },
  };
}

export async function register(form: AuthFormState) {
  await new Promise((r) => setTimeout(r, 700));
  if (!form.username || !form.password) {
    throw new Error("Invalid registration data");
  }
  return {
    token: "fake-token",
    user: { username: form.username },
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}
