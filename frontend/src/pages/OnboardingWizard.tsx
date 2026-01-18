import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { ChevronLeft } from "lucide-react";
import logo from "../assets/logo.png";

interface OnboardingData {
  major: string;
  year: string;
  creditsCompleted: string;
  coursesCompleted: string[];

  targetRole: string;
  industry: string;
  gradSchool: string;

  workHours: number;
  maxCredits: string;
  careerPrepTime: number;

  workloadPreference: string;
  commuteDays: string;
}

export default function OnboardingWizard() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    major: "",
    year: "",
    creditsCompleted: "",
    coursesCompleted: [],
    targetRole: "",
    industry: "",
    gradSchool: "",
    workHours: 0,
    maxCredits: "",
    careerPrepTime: 5,
    workloadPreference: "",
    commuteDays: "",
  });

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const progress = (step / 4) * 100;

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.major && data.year && data.creditsCompleted;
      case 2:
        return data.targetRole && data.gradSchool;
      case 3:
        return data.maxCredits;
      case 4:
        return data.workloadPreference;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    // TODO: Replace this with POST /profile later
    localStorage.setItem("onboardingData", JSON.stringify(data));

    // Go to dashboard
    navigate("/app/dashboard", { replace: true });
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="ThinkPath" className="size-8" />
            <span className="text-lg">ThinkPath</span>
          </div>
          <div className="text-sm text-muted-foreground">Step {step} of 4</div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2">Let&apos;s start with your academics</h2>
                <p className="text-sm text-muted-foreground">
                  This helps us build your semester-by-semester plan
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="major">Major *</Label>
                  <Select value={data.major} onValueChange={(value) => updateData("major", value)}>
                    <SelectTrigger id="major">
                      <SelectValue placeholder="Select your major" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="business">Business Administration</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="psychology">Psychology</SelectItem>
                      <SelectItem value="nursing">Nursing</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Current Year *</Label>
                  <Select value={data.year} onValueChange={(value) => updateData("year", value)}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freshman">Freshman</SelectItem>
                      <SelectItem value="sophomore">Sophomore</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credits">Credits Completed *</Label>
                  <Input
                    id="credits"
                    type="number"
                    placeholder="30"
                    value={data.creditsCompleted}
                    onChange={(e) => updateData("creditsCompleted", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courses">Courses Completed (optional)</Label>
                  <Input
                    id="courses"
                    placeholder="e.g., CS 101, MATH 120, ENG 101"
                    value={data.coursesCompleted.join(", ")}
                    onChange={(e) =>
                      updateData(
                        "coursesCompleted",
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate multiple courses with commas
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Steps 2–4 unchanged except minor formatting */}
          {/* Keep your existing step 2/3/4 blocks exactly as-is */}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
              <ChevronLeft className="size-4 mr-1" />
              Back
            </Button>

            <Button onClick={handleNext} disabled={!canProceed()}>
              {step === 4 ? "Generate my plan" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
