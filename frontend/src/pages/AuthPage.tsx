import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import logo from "../assets/logo.png";

type Route = "landing" | "login" | "signup" | "onboarding" | "dashboard" | "plan/academics" | "plan/career" | "tasks" | "chat";

interface AuthPageProps {
  mode: "login" | "signup";
  onAuth: () => void;
  onNavigate: (route: Route) => void;
}

export default function AuthPage({ mode, onAuth, onNavigate }: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock auth - in production this would call an API
    onAuth();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="College Advisor AI" className="size-12" />
          <span className="text-xl">College Advisor AI</span>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="mb-2">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "signup" 
              ? "Get your personalized plan in under 8 minutes" 
              : "Log in to access your academic plan"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-6">
            {mode === "signup" ? "Continue to onboarding" : "Log in"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">OR</span>
          </div>
        </div>

        {/* OAuth placeholder */}
        <Button variant="outline" className="w-full" type="button">
          <svg className="size-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Switch mode */}
        <div className="mt-6 text-center text-sm">
          {mode === "signup" ? (
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="text-primary hover:underline"
              >
                Log in
              </button>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => onNavigate("signup")}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}