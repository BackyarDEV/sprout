import type { AuthFormState } from "../types/Auth";

type AuthResponse = {
  id: number;
  username: string;
  role: string;
  token: string | null;
};

async function authRequest(
  endpoint: string,
  form: AuthFormState,
): Promise<AuthResponse> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: form.username,
      password: form.password,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid username or password");
    }
    if (response.status === 409) {
      throw new Error("That username is already taken");
    }

    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }

  return await response.json() as Promise<AuthResponse>;
}

export async function login(form: AuthFormState) {
  const result = await authRequest("/api/auth/login", form);

  if (!result.token) {
    throw new Error("Login succeeded but no token was returned");
  }

  return {
    token: result.token,
    user: {
      id: result.id,
      username: result.username,
      role: result.role,
    },
  };
}

export async function register(form: AuthFormState) {
  // The backend currently registers the account but does not issue a token.
  // The user must log in after registering.
  return authRequest("/api/auth/register", form);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
}