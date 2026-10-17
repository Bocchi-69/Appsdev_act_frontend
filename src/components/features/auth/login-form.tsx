import { useNavigate } from "react-router";
import { useState, type SubmitEvent } from "react";
import { useAuth } from "@/components/context/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return "Could not connect to the API. Please check that the API server is running.";
}

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const currentUser = await login(email, password);
      const destination = currentUser.role === "ADMIN" ? "/admin" : "/user";
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <div>
        <Label htmlFor="auth-email">Email</Label>
        <Input id="auth-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <Label htmlFor="auth-password">Password</Label>
        <Input id="auth-password" type="password" autoComplete="current-password" required minLength={1} value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>

      {error && <p role="alert" className="text-sm text-rosybrown-600 font-medium">{error}</p>}
      <Button type="submit" disabled={busy} className="mt-2 py-3 text-base font-medium disabled:cursor-wait disabled:opacity-60">
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
