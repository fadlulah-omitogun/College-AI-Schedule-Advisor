import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PostAuth() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      if (!isLoaded) return;

      if (!isSignedIn) {
        navigate("/login", { replace: true });
        return;
      }

      const token = await getToken();
      const res = await fetch("http://127.0.0.1:8000/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If backend says no account yet → invite required
      if (res.status === 403) {
        navigate("/invite", { replace: true });
        return;
      }

      if (!res.ok) {
        toast.error("Auth check failed. Please try again.");
        navigate("/login", { replace: true });
        return;
      }

      const data = await res.json();

      // If your backend returns a flag like needs_onboarding
      if (data?.needs_onboarding) {
        navigate("/app/onboarding", { replace: true });
        return;
      }

      navigate("/app/dashboard", { replace: true });
    };

    run();
  }, [isLoaded, isSignedIn, getToken, navigate]);

  return (
    <div className="min-h-screen grid place-items-center text-muted-foreground">
      Checking your account…
    </div>
  );
}
