import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import OnboardingWizard from "./pages/OnboardingWizard";
import Dashboard from "./pages/Dashboard";
import AcademicPlan from "./pages/AcademicPlan";
import CareerPlan from "./pages/CareerPlan";
import TasksPage from "./pages/TasksPage";
import AdvisorChat from "./pages/AdvisorChat";
import InvitePage from "./pages/InvitePage"; // you'll create this

import Protected from "./pages/Protected"; // your gate that calls /me

function PublicOnly({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedOut>{children}</SignedOut>
      <SignedIn>
        {/* if already signed in, go to app */}
        <Navigate to="/app/dashboard" replace />
      </SignedIn>
    </>
  );
}

function AppLayout() {
  // Keep nav inside app layout if you want
  return <Outlet />;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={
          <PublicOnly>
            <AuthPage mode="login" />
          </PublicOnly>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnly>
            <AuthPage mode="signup" />
          </PublicOnly>
        }
      />

      {/* Invite page should be accessible to signed-in users who are blocked */}
      <Route
        path="/invite"
        element={
          <SignedIn>
            <InvitePage />
          </SignedIn>
        }
      />

      {/* Protected app */}
      <Route
        path="/app"
        element={
          <SignedIn>
            <Protected>
              <AppLayout />
            </Protected>
          </SignedIn>
        }
      >
        <Route path="onboarding" element={<OnboardingWizard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="plan/academics" element={<AcademicPlan />} />
        <Route path="plan/career" element={<CareerPlan />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="chat" element={<AdvisorChat />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
