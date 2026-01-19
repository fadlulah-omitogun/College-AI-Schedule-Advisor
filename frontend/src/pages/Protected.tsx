import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!isLoaded) return;

      if (!isSignedIn) {
        setAllowed(false);
        navigate("/login", { replace: true });
        return;
      }

      const token = await getToken();
      const res = await fetch("http://127.0.0.1:8000/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 403) {
        toast.error("Invite required. Enter a code to continue.");
        setAllowed(false);
        navigate("/invite", { replace: true });
        return;
      }

      if (!res.ok) {
        toast.error("Auth check failed. Please try again.");
        setAllowed(false);
        navigate("/login", { replace: true });
        return;
      }

      const data = await res.json();

      const needsOnboarding = Boolean(data?.needs_onboarding);
      const onOnboardingRoute = location.pathname === "/app/onboarding";

      if (needsOnboarding && !onOnboardingRoute) {
        setAllowed(false);
        navigate("/app/onboarding", { replace: true });
        return;
      }

      // If onboarding is complete and user is sitting on onboarding page, send them out
      if (!needsOnboarding && onOnboardingRoute) {
        setAllowed(false);
        navigate("/app/dashboard", { replace: true });
        return;
      }

      setAllowed(true);
    };

    run();
  }, [isLoaded, isSignedIn, getToken, navigate, location.pathname]);

  if (!isLoaded) return null;
  if (!allowed) return null;

  return <>{children}</>;
}
