import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/components/context/use-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type NavItem = { label: string; href: string; role?: "USER" | "ADMIN" };

const navItems: NavItem[] = [
  { label: "Admin", href: "/admin", role: "ADMIN" },
];

export function NavBar() {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!ready || !user) return null;

  const isActive = (href: string) => location.pathname === href;
  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  async function handleLogout() {
    try {
      await logout();
      navigate("/auth/login", { replace: true });
    } catch {
      // handled by auth provider
    }
  }

  return (
    <header className="site-nav sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between">
          <Link
            to="/user"
            className="brand-mark flex items-center gap-3"
            aria-label="Recipe Book home"
          >
            <div className="brand-mark__icon flex h-11 w-11 items-center justify-center rounded-2xl bg-saffron-700">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 3v7m4-7v7M9 3v18m8-18v18m0-18c2.2 2.2 3 5.1 3 8h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.3rem] font-bold tracking-tight text-brown-800">Recipe Book</span>
              <span className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-saffron-700">Good things are cooking</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 rounded-full border border-biscuit-200/80 bg-white/55 p-1.5 shadow-soft">
            {navItems
              .filter((item) => !item.role || user?.role === item.role)
              .map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "nav-link rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                    isActive(item.href)
                      ? "is-active"
                      : "text-brown-600 hover:bg-cream-100 hover:text-brown-800"
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-biscuit-200/80 bg-white/60 py-1.5 pl-1.5 pr-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-olive-100 font-display text-sm font-bold text-olive-800">{initials || "R"}</span>
              <span className="flex flex-col leading-tight">
                <span className="max-w-32 truncate text-sm font-semibold text-brown-800">{user.name}</span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-brown-500">{user.role === "ADMIN" ? "Kitchen admin" : "Home cook"}</span>
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-full border-biscuit-300 px-3 py-2 text-xs text-brown-700 shadow-none hover:border-saffron-600 hover:bg-saffron-700 sm:px-4 sm:text-sm"
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
