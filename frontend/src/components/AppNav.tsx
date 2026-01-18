import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LayoutDashboard, BookOpen, Target, ListTodo, MessageSquare } from "lucide-react";
import logo from "../assets/logo.png";

type NavItem = {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function AppNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/app/plan/academics", label: "Academic Plan", icon: BookOpen },
    { path: "/app/plan/career", label: "Career Plan", icon: Target },
    { path: "/app/tasks", label: "Tasks", icon: ListTodo },
    { path: "/app/chat", label: "Advisor", icon: MessageSquare },
  ];

  const isActivePath = (path: string) => {
    // exact match works for your current routes
    // (you can broaden this later with startsWith)
    return location.pathname === path;
  };

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/app/dashboard")}
            className="flex items-center gap-2"
          >
            <img src={logo} alt="ThinkPath" className="size-8" />
            <span className="text-lg">ThinkPath</span>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(item.path);

              return (
                <Button
                  key={item.path}
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className="gap-2"
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">Menu</Button>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden flex items-center gap-1 mt-2 overflow-x-auto pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(item.path);

            return (
              <Button
                key={item.path}
                variant={active ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className="gap-2 flex-shrink-0"
              >
                <Icon className="size-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
