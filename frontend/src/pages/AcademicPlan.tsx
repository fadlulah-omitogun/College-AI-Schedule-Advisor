import { useState } from "react";
import AppNav from "../components/AppNav";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CheckCircle2, Circle, Clock, BookOpen } from "lucide-react";

type Route = "landing" | "login" | "signup" | "onboarding" | "dashboard" | "plan/academics" | "plan/career" | "tasks" | "chat";

interface AcademicPlanProps {
  onNavigate: (route: Route) => void;
}

interface Course {
  code: string;
  name: string;
  credits: number;
  status: "completed" | "in-progress" | "planned";
}

interface Semester {
  term: string;
  year: number;
  courses: Course[];
  workload: "light" | "balanced" | "heavy";
}

export default function AcademicPlan({ onNavigate }: AcademicPlanProps) {
  const [maxCreditsMode, setMaxCreditsMode] = useState(false);
  const [lighterWorkload, setLighterWorkload] = useState(false);

  // Mock semester data
  const semesters: Semester[] = [
    {
      term: "Fall",
      year: 2024,
      courses: [
        { code: "CS 101", name: "Intro to CS", credits: 4, status: "completed" },
        { code: "MATH 120", name: "Calculus I", credits: 4, status: "completed" },
        { code: "ENG 101", name: "English Composition", credits: 3, status: "completed" },
        { code: "HIST 100", name: "World History", credits: 3, status: "completed" },
      ],
      workload: "balanced"
    },
    {
      term: "Spring",
      year: 2025,
      courses: [
        { code: "CS 201", name: "Data Structures", credits: 4, status: "completed" },
        { code: "MATH 220", name: "Discrete Math", credits: 3, status: "completed" },
        { code: "PHYS 101", name: "Physics I", credits: 4, status: "completed" },
        { code: "ENG 102", name: "Advanced Composition", credits: 3, status: "completed" },
      ],
      workload: "balanced"
    },
    {
      term: "Fall",
      year: 2025,
      courses: [
        { code: "CS 210", name: "Computer Architecture", credits: 4, status: "in-progress" },
        { code: "CS 220", name: "Software Engineering", credits: 3, status: "in-progress" },
        { code: "STAT 200", name: "Statistics", credits: 3, status: "in-progress" },
        { code: "PSY 100", name: "Intro to Psychology", credits: 3, status: "in-progress" },
      ],
      workload: "balanced"
    },
    {
      term: "Spring",
      year: 2026,
      courses: [
        { code: "CS 301", name: "Algorithms", credits: 4, status: "planned" },
        { code: "CS 310", name: "Database Systems", credits: 3, status: "planned" },
        { code: "CS 315", name: "Web Development", credits: 3, status: "planned" },
        { code: "PHIL 200", name: "Ethics", credits: 3, status: "planned" },
      ],
      workload: "balanced"
    },
    {
      term: "Fall",
      year: 2026,
      courses: [
        { code: "CS 401", name: "Machine Learning", credits: 4, status: "planned" },
        { code: "CS 420", name: "Operating Systems", credits: 3, status: "planned" },
        { code: "CS 490", name: "Senior Project I", credits: 3, status: "planned" },
        { code: "ECON 101", name: "Microeconomics", credits: 3, status: "planned" },
      ],
      workload: "balanced"
    },
    {
      term: "Spring",
      year: 2027,
      courses: [
        { code: "CS 491", name: "Senior Project II", credits: 3, status: "planned" },
        { code: "CS 430", name: "Computer Networks", credits: 3, status: "planned" },
        { code: "ART 100", name: "Art History", credits: 3, status: "planned" },
      ],
      workload: "light"
    }
  ];

  // Degree requirements
  const requirements = [
    { category: "Core CS", required: 45, completed: 30, inProgress: 12 },
    { category: "Math & Science", required: 24, completed: 18, inProgress: 3 },
    { category: "Humanities", required: 18, completed: 12, inProgress: 3 },
    { category: "Electives", required: 18, completed: 14, inProgress: 0 },
    { category: "General Ed", required: 15, completed: 12, inProgress: 0 },
  ];

  const totalRequired = requirements.reduce((sum, req) => sum + req.required, 0);
  const totalCompleted = requirements.reduce((sum, req) => sum + req.completed, 0);
  const overallProgress = (totalCompleted / totalRequired) * 100;

  const getStatusIcon = (status: Course["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="size-4 text-green-600" />;
      case "in-progress":
        return <Clock className="size-4 text-blue-600" />;
      case "planned":
        return <Circle className="size-4 text-gray-400" />;
    }
  };

  const getWorkloadColor = (workload: Semester["workload"]) => {
    switch (workload) {
      case "light":
        return "bg-green-100 text-green-700 border-green-200";
      case "balanced":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "heavy":
        return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AppNav currentRoute="plan/academics" onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">Academic Plan</h1>
          <p className="text-muted-foreground">
            Your semester-by-semester roadmap to graduation
          </p>
        </div>

        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList>
            <TabsTrigger value="timeline">Semester Timeline</TabsTrigger>
            <TabsTrigger value="requirements">Degree Audit</TabsTrigger>
            <TabsTrigger value="what-if">What-If Analysis</TabsTrigger>
          </TabsList>

          {/* Timeline View */}
          <TabsContent value="timeline" className="space-y-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {semesters.map((semester, idx) => {
                const totalCredits = semester.courses.reduce((sum, c) => sum + c.credits, 0);
                return (
                  <Card key={idx} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="mb-1">{semester.term} {semester.year}</h3>
                        <p className="text-sm text-muted-foreground">{totalCredits} credits</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getWorkloadColor(semester.workload)}`}>
                        {semester.workload}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {semester.courses.map((course, courseIdx) => (
                        <div key={courseIdx} className="flex items-start gap-2 text-sm">
                          {getStatusIcon(course.status)}
                          <div className="flex-1">
                            <div className={course.status === "completed" ? "text-muted-foreground" : ""}>
                              <span>{course.code}:</span> {course.name}
                            </div>
                            <div className="text-xs text-muted-foreground">{course.credits} cr</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Requirements View */}
          <TabsContent value="requirements" className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3>Overall Progress</h3>
                  <span className="text-sm">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {totalCompleted} of {totalRequired} credits completed
                </p>
              </div>

              <div className="space-y-4">
                {requirements.map((req, idx) => {
                  const progress = (req.completed / req.required) * 100;
                  const remaining = req.required - req.completed - req.inProgress;
                  
                  return (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="size-4 text-muted-foreground" />
                          <h4>{req.category}</h4>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {req.completed + req.inProgress} / {req.required} credits
                        </span>
                      </div>

                      <Progress value={progress} className="h-2 mb-2" />

                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="size-3 text-green-600" />
                          {req.completed} completed
                        </span>
                        {req.inProgress > 0 && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3 text-blue-600" />
                            {req.inProgress} in progress
                          </span>
                        )}
                        {remaining > 0 && (
                          <span className="flex items-center gap-1">
                            <Circle className="size-3 text-gray-400" />
                            {remaining} remaining
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* What-If Analysis */}
          <TabsContent value="what-if" className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Adjust Your Plan</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Toggle these options to see how your plan changes
              </p>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="max-credits">Maximum Credits Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Take 18+ credits per semester to graduate early
                    </p>
                  </div>
                  <Switch
                    id="max-credits"
                    checked={maxCreditsMode}
                    onCheckedChange={setMaxCreditsMode}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="lighter-workload">Lighter Workload</Label>
                    <p className="text-xs text-muted-foreground">
                      Reduce to 12-13 credits per semester for better balance
                    </p>
                  </div>
                  <Switch
                    id="lighter-workload"
                    checked={lighterWorkload}
                    onCheckedChange={setLighterWorkload}
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full">
                    Recompute Plan
                  </Button>
                </div>
              </div>

              {(maxCreditsMode || lighterWorkload) && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="mb-2">Impact Preview</h4>
                  <div className="space-y-2 text-sm">
                    {maxCreditsMode && (
                      <p>• Graduate 1 semester early (Fall 2026)</p>
                    )}
                    {lighterWorkload && (
                      <p>• Graduate 1 semester late (Fall 2027)</p>
                    )}
                    <p className="text-muted-foreground text-xs mt-3">
                      Click "Recompute Plan" to apply these changes
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
