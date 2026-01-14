import { useState } from "react";
import AppNav from "../components/AppNav";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Progress } from "../components/ui/progress";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle, Calendar, BookOpen, RefreshCw, CheckCircle2, TrendingUp } from "lucide-react";

type Route = "landing" | "login" | "signup" | "onboarding" | "dashboard" | "plan/academics" | "plan/career" | "tasks" | "chat";

interface DashboardProps {
  onNavigate: (route: Route) => void;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  type: "academic" | "career" | "deadline";
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete CS 201 Assignment 4 - Binary Trees", completed: false, type: "academic" },
    { id: "2", title: "Update resume with recent Python project", completed: false, type: "career" },
    { id: "3", title: "Register for Spring 2026 courses (opens Jan 20)", completed: false, type: "deadline" },
    { id: "4", title: "Study for MATH 220 Midterm (Friday)", completed: true, type: "academic" },
    { id: "5", title: "Apply to 3 summer internships", completed: false, type: "career" },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  // Mock data
  const degreeProgress = 62; // percentage
  const careerReadiness = 45; // percentage

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AppNav currentRoute="dashboard" onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2">Welcome back, Alex</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your plan this week
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* This Week Tasks */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="mb-1">This Week</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedTasks} of {totalTasks} completed
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onNavigate("tasks")}>
                  View all
                </Button>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                      task.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          task.type === "academic" ? "bg-blue-100 text-blue-700" :
                          task.type === "career" ? "bg-green-100 text-green-700" :
                          "bg-orange-100 text-orange-700"
                        }`}>
                          {task.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alerts */}
            <Card className="p-6">
              <h3 className="mb-4">Alerts & Reminders</h3>
              
              <div className="space-y-3">
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="size-4 text-orange-600" />
                  <AlertDescription className="text-sm">
                    <strong>Registration opens Jan 20:</strong> Make sure to register early for popular courses.
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-200 bg-blue-50">
                  <BookOpen className="size-4 text-blue-600" />
                  <AlertDescription className="text-sm">
                    <strong>Elective needed:</strong> You need 1 more humanities elective for degree requirements.
                  </AlertDescription>
                </Alert>

                <Alert className="border-yellow-200 bg-yellow-50">
                  <Calendar className="size-4 text-yellow-600" />
                  <AlertDescription className="text-sm">
                    <strong>Prereq check:</strong> CS 301 requires CS 201 with grade B+ or higher.
                  </AlertDescription>
                </Alert>
              </div>
            </Card>

            {/* Next Semester Recommendation */}
            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="mb-1">Spring 2026 Recommendation</h3>
                  <p className="text-sm text-muted-foreground">Based on your preferences and progress</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onNavigate("plan/academics")}
                >
                  View plan
                </Button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>CS 301: Algorithms</span>
                  <span className="text-muted-foreground">4 cr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>CS 310: Database Systems</span>
                  <span className="text-muted-foreground">3 cr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>STAT 200: Statistics</span>
                  <span className="text-muted-foreground">3 cr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>HUM 250: Philosophy</span>
                  <span className="text-muted-foreground">3 cr</span>
                </div>
              </div>

              <div className="pt-3 border-t border-blue-200">
                <p className="text-sm text-muted-foreground">
                  Total: 13 credits • Balanced workload
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column - Progress & Quick Actions */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="p-6">
              <h3 className="mb-6">Your Progress</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Degree Progress</span>
                    <span className="text-sm">{degreeProgress}%</span>
                  </div>
                  <Progress value={degreeProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    74 of 120 credits completed
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Career Readiness</span>
                    <span className="text-sm">{careerReadiness}%</span>
                  </div>
                  <Progress value={careerReadiness} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    5 of 11 milestones completed
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => onNavigate("plan/career")}
                >
                  <TrendingUp className="size-4" />
                  View career plan
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h4 className="mb-4">Quick Stats</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Semester</span>
                  <span className="text-sm">Spring 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Credits</span>
                  <span className="text-sm">15 credits</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Target Graduation</span>
                  <span className="text-sm">May 2027</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">GPA Goal</span>
                  <span className="text-sm">3.5+</span>
                </div>
              </div>
            </Card>

            {/* Regenerate Plan */}
            <Card className="p-6 bg-gray-50">
              <div className="flex items-start gap-3 mb-3">
                <RefreshCw className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="mb-1">Update Your Plan</h4>
                  <p className="text-xs text-muted-foreground">
                    Life changed? Update your profile and regenerate your plan.
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                Regenerate plan
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}