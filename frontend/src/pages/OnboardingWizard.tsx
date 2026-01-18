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


          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2">What are your career goals?</h2>
                <p className="text-sm text-muted-foreground">
                  We'll build a career plan tailored to your target role
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="target-role">Target Role *</Label>
                  <Select value={data.targetRole} onValueChange={(value) => updateData("targetRole", value)}>
                    <SelectTrigger id="target-role">
                      <SelectValue placeholder="What do you want to do?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-engineer">Software Engineer</SelectItem>
                      <SelectItem value="data-scientist">Data Scientist</SelectItem>
                      <SelectItem value="product-manager">Product Manager</SelectItem>
                      <SelectItem value="consultant">Consultant</SelectItem>
                      <SelectItem value="financial-analyst">Financial Analyst</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="researcher">Researcher</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry Interest (optional)</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Healthcare, Fintech, EdTech"
                    value={data.industry}
                    onChange={(e) => updateData("industry", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Planning for grad school? *</Label>
                  <RadioGroup value={data.gradSchool} onValueChange={(value) => updateData("gradSchool", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="grad-yes" />
                      <Label htmlFor="grad-yes" className="cursor-pointer">Yes, definitely</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="grad-maybe" />
                      <Label htmlFor="grad-maybe" className="cursor-pointer">Maybe / Considering it</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="grad-no" />
                      <Label htmlFor="grad-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2">Tell us about your constraints</h2>
                <p className="text-sm text-muted-foreground">
                  This helps us create a realistic, balanced plan
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Work hours per week: {data.workHours} hours</Label>
                  <Slider
                    value={[data.workHours]}
                    onValueChange={(value) => updateData("workHours", value[0])}
                    max={40}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>20</span>
                    <span>40</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-credits">Maximum credits per semester *</Label>
                  <Select value={data.maxCredits} onValueChange={(value) => updateData("maxCredits", value)}>
                    <SelectTrigger id="max-credits">
                      <SelectValue placeholder="How many credits are you comfortable with?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 credits (light load)</SelectItem>
                      <SelectItem value="15">15 credits (standard)</SelectItem>
                      <SelectItem value="18">18 credits (heavy load)</SelectItem>
                      <SelectItem value="21">21+ credits (maximum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Time for career prep per week: {data.careerPrepTime} hours</Label>
                  <Slider
                    value={[data.careerPrepTime]}
                    onValueChange={(value) => updateData("careerPrepTime", value[0])}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>10</span>
                    <span>20</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    For projects, applications, networking, etc.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-2">Final step: your preferences</h2>
                <p className="text-sm text-muted-foreground">
                  We'll use these to optimize your schedule
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Workload preference *</Label>
                  <RadioGroup value={data.workloadPreference} onValueChange={(value) => updateData("workloadPreference", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="workload-light" />
                      <Label htmlFor="workload-light" className="cursor-pointer">
                        <div>
                          <div>Lighter workload</div>
                          <div className="text-xs text-muted-foreground">Fewer credits, more time for extracurriculars</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="balanced" id="workload-balanced" />
                      <Label htmlFor="workload-balanced" className="cursor-pointer">
                        <div>
                          <div>Balanced</div>
                          <div className="text-xs text-muted-foreground">Standard course load with time for career prep</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="aggressive" id="workload-aggressive" />
                      <Label htmlFor="workload-aggressive" className="cursor-pointer">
                        <div>
                          <div>Aggressive</div>
                          <div className="text-xs text-muted-foreground">Maximum credits to graduate early or double major</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commute">Commute constraint (optional)</Label>
                  <Select value={data.commuteDays} onValueChange={(value) => updateData("commuteDays", value)}>
                    <SelectTrigger id="commute">
                      <SelectValue placeholder="Any preferences?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No preference</SelectItem>
                      <SelectItem value="mwf">MWF only</SelectItem>
                      <SelectItem value="tth">T/TH only</SelectItem>
                      <SelectItem value="3days">3 days max</SelectItem>
                      <SelectItem value="2days">2 days max</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
                <p className="text-sm">
                  🎉 You're all set! We'll generate your personalized academic and career plan in seconds.
                </p>
              </div>
            </div>
          )}


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