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

export function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const currentUser = await signup(name, email, password);
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
        <Label htmlFor="auth-name">Full Name</Label>
        <Input id="auth-name" autoComplete="name" required minLength={2} value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <Label htmlFor="auth-email">Email</Label>
        <Input id="auth-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <Label htmlFor="auth-password">Password</Label>
        <Input id="auth-password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <p className="-mt-2 text-xs text-brown-500/70 font-medium">Use at least 8 characters, including one uppercase letter and one number.</p>
      {error && <p role="alert" className="text-sm text-rosybrown-600 font-medium">{error}</p>}
      <Button type="submit" disabled={busy} className="mt-2 py-3 text-base font-medium disabled:cursor-wait disabled:opacity-60">
        {busy ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
