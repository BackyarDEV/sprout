import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Alert,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { AuthFormState } from "../types/Auth";

export default function LoginForm() {
  const [form, setForm] = useState<AuthFormState>({ username: "", password: "", remember: false });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!form.username) return "Username is required";
    if (!form.password) return "Password is required";
    return null;
  };

  const onSubmit = async (e?: React.ChangeEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
      await login(form);
      navigate("/employees");
    } catch (err: unknown) {
      setError((err as Error).message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sign in
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
        autoComplete="current-password"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="secondary"
            checked={!!form.remember}
            onChange={(e) => setForm({ ...form, remember: e.target.checked })}
          />
        }
        label="Remember me"
      />
      <Link component="button" type="button" onClick={() => alert("Implement reset flow")}>
        Forgot?
      </Link>

      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button color={"secondary"} type="submit" variant="contained" disabled={loading} sx={{ flex: 1 }}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
        <Button
          variant="outlined"
          color={"secondary"}
          onClick={() => {
            setForm({ username: "", password: "", remember: false });
            setError(null);
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}
