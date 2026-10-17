import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { SignupForm } from "@/components/features/auth/signup-form";

export default function SignupPage() {
  return (
    <Card variant="elevated" className="auth-page-card rounded-3xl p-8 sm:p-12 max-w-md mx-auto">
      <AuthFormHeader title="Create your account" description="A little inspiration for your everyday cooking." />

      <SignupForm />

      <Link className="mt-8 block text-center text-sm text-brown-600 font-medium underline underline-offset-4 hover:text-brown-800" to={"/auth/login"}>
        Already have an account? Sign in
      </Link>
    </Card>
  );
}
