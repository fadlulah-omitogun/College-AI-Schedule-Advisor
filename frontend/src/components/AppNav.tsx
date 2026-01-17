import { Button } from "./ui/button.tsx";
import { LayoutDashboard, BookOpen, Target, ListTodo, MessageSquare } from "lucide-react";
import logo from "../assets/logo.png";

type Route = "landing" | "login" | "signup" | "onboarding" | "dashboard" | "plan/academics" | "plan/career" | "tasks" | "chat";

interface AppNavProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
}

export default function AppNav({ currentRoute, onNavigate }: AppNavProps) {
  const navItems = [
    { route: "dashboard" as Route, label: "Dashboard", icon: LayoutDashboard },
    { route: "plan/academics" as Route, label: "Academic Plan", icon: BookOpen },
    { route: "plan/career" as Route, label: "Career Plan", icon: Target },
    { route: "tasks" as Route, label: "Tasks", icon: ListTodo },
    { route: "chat" as Route, label: "Advisor", icon: MessageSquare },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="ThinkPath" className="size-8" />
            <span className="text-lg">ThinkPath</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;
              return (
                <Button
                  key={item.route}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.route)}
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
            const isActive = currentRoute === item.route;
            return (
              <Button
                key={item.route}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.route)}
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