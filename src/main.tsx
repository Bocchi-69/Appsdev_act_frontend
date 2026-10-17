import "@/styles/global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "@/pages/user/home";
import { RecipeDetails } from "@/pages/user/recipe";
import { AdminRecipes } from "@/pages/admin/home";
import AuthLayout from "@/pages/auth/layout";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import { AuthProvider } from "@/components/context/auth-context";
import { ProtectedRoute, HomeRedirect } from "@/components/context/protected-route";
import { NavBar } from "@/components/common/nav-bar";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      {/*
        NavBar only renders once the session is resolved and a user is signed in.
      */}
      {/*
        We cannot conditionally render routes, so we render the NavBar as a
        sibling that self-hides when not ready or not signed in.
      */}
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        {/* Auth pages */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* User Panel Pages */}
        <Route element={<ProtectedRoute role="USER" />}>
          <Route path="/user" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Route>

        {/* Admin Pages */}
        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin" element={<AdminRecipes />} />
        </Route>
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
);
