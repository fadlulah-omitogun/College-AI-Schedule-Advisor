import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import logo from "../assets/logo.png";
import { SignIn, SignUp } from "@clerk/clerk-react";

export default function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const navigate = useNavigate();

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
              routing="path"
              path="/login"
              afterSignInUrl="/post-auth"
              signUpUrl="/signup"
            />
          ) : (
            <SignUp
              routing="path"
              path="/signup"
              afterSignUpUrl="/post-auth"
              signInUrl="/login"
            />
          )}
        </div>

        <div className="mt-6 text-center text-sm">
          {mode === "signup" ? (
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
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
                onClick={() => navigate("/signup")}
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
