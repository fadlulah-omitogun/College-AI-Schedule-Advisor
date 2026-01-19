import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CheckCircle2, Target, Shield } from "lucide-react";
import logo from "../assets/logo.png";
import Banner from "../assets/landingBanner.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="College Advisor AI" className="size-10" />
            <span className="text-lg">ThinkPath</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Banner})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Your personalized academic + career plan that{" "}
              <span className="text-cyan-300">updates when life changes</span>
            </h1>

            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Get a clear roadmap from day one to graduation and beyond. Always know what to do next.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
              <div className="flex gap-3">
                <CheckCircle2 className="size-5 text-green-300 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/95">
                  Semester-by-semester roadmap based on your major + prereqs
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="size-5 text-green-300 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/95">Career plan for your target role</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="size-5 text-green-300 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/95">Weekly tasks so you always know what to do next</p>
              </div>
            </div>

            <div className="pt-8 flex items-center justify-center gap-3">
              <Button
                size="lg"
                className="h-12 px-8"
                onClick={() => navigate("/signup")}
              >
                Create my plan
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-8">Your plan at a glance</h2>

          <Card className="p-6 bg-white shadow-xl">
            <div className="space-y-6">
              {/* Mock Dashboard Preview */}
              <div>
                <h3 className="mb-4">This Week</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="size-4 rounded border-2 border-gray-400" />
                    <span className="text-sm">Complete CS 101 Assignment 3</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="size-4 rounded border-2 border-gray-400" />
                    <span className="text-sm">Update resume with recent project</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="size-4 rounded border-2 border-gray-400" />
                    <span className="text-sm">Register for Spring 2026 courses</span>
                  </div>
                </div>
              </div>

              {/* Mock Semester Timeline */}
              <div>
                <h3 className="mb-4">Spring 2026 Plan</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm">CS 201: Data Structures</span>
                      <span className="text-xs text-muted-foreground">4 cr</span>
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm">MATH 220: Discrete Math</span>
                      <span className="text-xs text-muted-foreground">3 cr</span>
                    </div>
                    <div className="flex items-start justify-between">
                      <span className="text-sm">ENG 102: Composition</span>
                      <span className="text-xs text-muted-foreground">3 cr</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <span className="text-xs text-muted-foreground">Total: 13 credits • Balanced workload</span>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="size-4 text-green-700" />
                      <span className="text-sm">Career Milestone</span>
                    </div>
                    <p className="text-sm mb-2">Build personal project: Todo app with React</p>
                    <p className="text-xs text-muted-foreground">Supports goal: Software Engineer</p>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-6">
            <Shield className="size-6 text-blue-600" />
            <h2>Your data, your control</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-center">
            <Card className="p-6">
              <h4 className="mb-2">Privacy First</h4>
              <p className="text-sm text-muted-foreground">
                Your academic and career data is encrypted and never shared with third parties.
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="mb-2">Transparent AI</h4>
              <p className="text-sm text-muted-foreground">
                Our AI advisor only uses your own data and degree requirements—no hallucinations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-white">Ready to plan your future?</h2>
          <p className="text-lg mb-8 text-white/90">
            Takes less than 8 minutes to get your personalized plan
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/signup")}
          >
            Get started free
          </Button>
        </div>
      </section>

      <footer className="border-t py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 ThinkPath. Built to help students succeed.</p>
        </div>
      </footer>
    </div>
  );
}
