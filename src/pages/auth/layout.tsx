import { AuthHeader } from "@/components/features/auth/auth-header";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/components/context/use-auth";

export default function AuthLayout() {
  const { user, ready } = useAuth();

  if (ready && user) return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
  return (
    <main className="auth-shell">
      <div className="auth-layout">
        <section className="auth-showcase" aria-label="Recipe Book introduction">
          <img
            className="auth-showcase__image"
            src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1400&q=85"
            alt=""
            fetchPriority="high"
          />
          <div className="auth-showcase__overlay" />
          <div className="auth-showcase__content">
            <AuthHeader />
            <p className="auth-showcase__quote">A home for the recipes you love, and the ones you’re about to.</p>
            <div className="auth-showcase__signature"><span /> Good food, gathered here <span /></div>
          </div>
        </section>
        <section className="auth-panel" aria-label="Account access">
          {ready && <Outlet />}
        </section>
      </div>
    </main>
  );
}
