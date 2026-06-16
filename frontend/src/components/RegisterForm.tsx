import React, { useState } from "react";
import { TextField, Button, Box, Alert, Typography, Link } from "@mui/material";
import type { AuthFormState } from "../types/Auth";

export default function RegisterForm() {
  const [form, setForm] = useState<AuthFormState>({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.username) return "Username is required";
    if (!/\S+@\S+\.\S+/.test(form.username)) return "Enter a valid username";
    if (!form.password) return "Password is required";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password))
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
    return null;
  };

  const onSubmit = async (e?: React.ChangeEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setError(null);
    setSuccess(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setSuccess("Registration successful. Please check your username to verify or sign in.");
      setForm({ username: "", password: "", confirmPassword: "" });
    } catch (err: unknown) {
      setError((err as Error).message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create an account
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField
        label="Username"
        type="username"
        fullWidth
        margin="normal"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        autoComplete="username"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        autoComplete="new-password"
      />
      <TextField
        label="Confirm password"
        type="password"
        fullWidth
        margin="normal"
        value={form.confirmPassword || ""}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        autoComplete="new-password"
      />
      <Box sx={{ my: 2, display: "flex", gap: 1 }}>
        <Button color={"secondary"} type="submit" variant="contained" disabled={loading} sx={{ flex: 1 }}>
          {loading ? "Registering..." : "Register"}
        </Button>
        <Button
          variant="outlined"
          color={"secondary"}
          onClick={() => {
            setForm({ username: "", password: "", confirmPassword: "" });
            setError(null);
            setSuccess(null);
          }}
        >
          Reset
        </Button>
      </Box>
      <Typography variant="body2" color="text.secondary">
        By signing up you agree to the{" "}
        <Link component="button" onClick={() => alert("Show TOS")}>
          Terms of Service
        </Link>
        .
      </Typography>
    </Box>
  );
}
