import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const navigate = useNavigate();
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
        toast.error("No ThinkPath account found. Enter an invite code to continue.");
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

      setAllowed(true);
    };

    run();
  }, [isLoaded, isSignedIn, getToken, navigate]);

  if (!isLoaded) return null;
  if (!allowed) return null;

  return <>{children}</>;
}
