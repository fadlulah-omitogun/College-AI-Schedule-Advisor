import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import OnboardingWizard from "./pages/OnboardingWizard";
import Dashboard from "./pages/Dashboard";
import AcademicPlan from "./pages/AcademicPlan";
import CareerPlan from "./pages/CareerPlan";
import TasksPage from "./pages/TasksPage";
import AdvisorChat from "./pages/AdvisorChat";

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

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>("landing");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const navigate = (route: Route) => {
    setCurrentRoute(route);
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    navigate("onboarding");
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    navigate("dashboard");
  };

  const renderPage = () => {
    switch (currentRoute) {
      case "landing":
        return <LandingPage onNavigate={navigate} />;
      case "login":
      case "signup":
        return <AuthPage mode={currentRoute} onAuth={handleAuth} onNavigate={navigate} />;
      case "onboarding":
        return <OnboardingWizard onComplete={handleOnboardingComplete} />;
      case "dashboard":
        return <Dashboard onNavigate={navigate} />;
      case "plan/academics":
        return <AcademicPlan onNavigate={navigate} />;
      case "plan/career":
        return <CareerPlan onNavigate={navigate} />;
      case "tasks":
        return <TasksPage onNavigate={navigate} />;
      case "chat":
        return <AdvisorChat onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="size-full">
      {renderPage()}
    </div>
  );
}
