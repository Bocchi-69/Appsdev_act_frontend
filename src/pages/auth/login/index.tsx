import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { LoginForm } from "@/components/features/auth/login-form";

export default function LoginPage() {
  return (
    <Card variant="elevated" className="auth-page-card rounded-3xl p-8 sm:p-12 max-w-md mx-auto">
      <AuthFormHeader title="Welcome back" description="Sign in to find your next favorite meal." />

      <LoginForm />

      <Link className="mt-8 block text-center text-sm text-brown-600 font-medium underline underline-offset-4 hover:text-brown-800" to={"/auth/signup"}>
        New here? Create an account
      </Link>
    </Card>
  );
}
