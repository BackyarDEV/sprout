const API_BASE = "";

export async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.assign("/login");
    throw new Error("Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }

  return response;
}