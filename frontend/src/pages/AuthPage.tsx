import { Card } from "../components/ui/card";
import logo from "../assets/logo.png";
import { SignIn, SignUp } from "@clerk/clerk-react";

type Route =
  | "landing"
  | "login"
  | "signup"
  | "onboarding"
  | "dashboard"
  | "plan/academics"
  | "plan/career"
  | "tasks"
  | "chat";

interface AuthPageProps {
  mode: "login" | "signup";
  onNavigate: (route: Route) => void;
}

export default function AuthPage({ mode, onNavigate }: AuthPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="ThinkPath" className="size-12" />
          <span className="text-xl">ThinkPath</span>
        </div>

        <div className="flex justify-center">
          {mode === "login" ? (
            <SignIn
              routing="hash"
              afterSignInUrl="/#/app/dashboard"
              signUpUrl="/#/signup"
            />
          ) : (
            <SignUp
              routing="hash"
              afterSignUpUrl="/#/app/onboarding"
              signInUrl="/#/login"
            />
          )}
        </div>

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
              Don&apos;t have an account?{" "}
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
