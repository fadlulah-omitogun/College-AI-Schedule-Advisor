import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

// import AppNav from "../components/AppNav";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function InvitePage() {

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    try {
      const token = await getToken();

      const res = await fetch("http://127.0.0.1:8000/signup/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.detail ?? "Invite code failed. Please try again.");
        return;
      }

      toast.success("Access granted! Welcome to ThinkPath.");
      navigate("/app/onboarding", { replace: true });
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const run = async () => {
    const token = await getToken();
    const res = await fetch("http://127.0.0.1:8000/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return; // 403 -> stay

    const data = await res.json();
    if (data.needs_onboarding) navigate("/app/onboarding", { replace: true });
    else navigate("/app/dashboard", { replace: true });
  };

  run();
}, [getToken, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Optional: you can hide AppNav here if you want */}
      {/* <AppNav /> */}

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl mb-2">Enter your invite code</h1>
            <p className="text-sm text-muted-foreground mb-6">
              ThinkPath is invite-only right now. Enter your code to activate your account.
            </p>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invite">Invite code</Label>
                <Input
                  id="invite"
                  placeholder="THINKPATH-ALPHA-001"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Checking..." : "Unlock ThinkPath"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Don’t have a code? Contact the team or join the waitlist.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
