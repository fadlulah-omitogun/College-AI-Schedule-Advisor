import AppNav from "../components/AppNav";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { CheckCircle2, Circle, Target, Lightbulb, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Milestone {
  id: string;
  category: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export default function CareerPlan() {
  const targetRole = "Software Engineer";
  const targetIndustry = "Tech / Startups";
  const navigate = useNavigate();

  const milestones: Milestone[] = [
    // Resume/LinkedIn
    { id: "1", category: "Resume/LinkedIn", title: "Create professional resume", completed: true, priority: "high" },
    { id: "2", category: "Resume/LinkedIn", title: "Set up LinkedIn profile", completed: true, priority: "high" },
    { id: "3", category: "Resume/LinkedIn", title: "Get resume reviewed by career center", completed: false, priority: "medium" },
    
    // Projects
    { id: "4", category: "Projects", title: "Build personal portfolio website", completed: true, priority: "high" },
    { id: "5", category: "Projects", title: "Complete 2-3 substantial projects", completed: false, priority: "high" },
    { id: "6", category: "Projects", title: "Contribute to open source project", completed: false, priority: "medium" },
    
    // Interview Prep
    { id: "7", category: "Interview prep", title: "Practice 50 LeetCode problems", completed: true, priority: "high" },
    { id: "8", category: "Interview prep", title: "Complete mock interviews", completed: false, priority: "high" },
    { id: "9", category: "Interview prep", title: "Study system design basics", completed: false, priority: "medium" },
    
    // Applications
    { id: "10", category: "Internship applications", title: "Apply to 10+ summer internships", completed: false, priority: "high" },
    { id: "11", category: "Internship applications", title: "Secure summer 2026 internship", completed: false, priority: "high" },
    
    // Networking
    { id: "12", category: "Networking", title: "Attend 3+ career fairs", completed: true, priority: "medium" },
    { id: "13", category: "Networking", title: "Connect with 5 professionals in field", completed: false, priority: "low" },
  ];

  const completedMilestones = milestones.filter(m => m.completed).length;
  const totalMilestones = milestones.length;
  const careerProgress = (completedMilestones / totalMilestones) * 100;

  const categories = Array.from(new Set(milestones.map(m => m.category)));

  const skillGaps = [
    { skill: "React.js", importance: "Critical", action: "Build 2-3 projects using React" },
    { skill: "System Design", importance: "High", action: "Study Grokking the System Design Interview" },
    { skill: "Cloud (AWS/GCP)", importance: "Medium", action: "Complete AWS fundamentals course" },
    { skill: "Testing/QA", importance: "Medium", action: "Learn Jest and write tests for projects" },
    { skill: "Git Collaboration", importance: "High", action: "Contribute to open source, use PRs" },
  ];

  const suggestedProject = {
    title: "Full-Stack Task Management App",
    description: "Build a web app with user authentication, real-time updates, and a RESTful API",
    skills: ["React", "Node.js", "PostgreSQL", "Authentication", "API design"],
    steps: [
      "Set up React frontend with TypeScript",
      "Build Express backend with JWT auth",
      "Design and implement PostgreSQL schema",
      "Add real-time updates with WebSockets",
      "Deploy to cloud platform (Heroku/Vercel)",
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AppNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Career Plan</h1>
          <p className="text-muted-foreground">
            Your roadmap to becoming a {targetRole}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Milestones */}
          <div className="lg:col-span-2 space-y-6">
            {/* Target Role */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <div className="flex items-start gap-3">
                <Target className="size-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="mb-1">Target Role</h3>
                  <p className="text-lg mb-1">{targetRole}</p>
                  <p className="text-sm text-muted-foreground">Industry: {targetIndustry}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on your major (Computer Science) and career preferences
                  </p>
                </div>
              </div>
            </Card>

            {/* Progress */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Career Readiness</h3>
                <span className="text-sm">{Math.round(careerProgress)}%</span>
              </div>
              <Progress value={careerProgress} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">
                {completedMilestones} of {totalMilestones} milestones completed
              </p>
            </Card>

            {/* Milestones by Category */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Career Milestones</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/app/tasks")}
                >
                  Generate tasks
                </Button>
              </div>

              <div className="space-y-6">
                {categories.map((category) => {
                  const categoryMilestones = milestones.filter(m => m.category === category);
                  const categoryCompleted = categoryMilestones.filter(m => m.completed).length;
                  
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm">{category}</h4>
                        <span className="text-xs text-muted-foreground">
                          {categoryCompleted}/{categoryMilestones.length}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {categoryMilestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border ${
                              milestone.completed 
                                ? "bg-gray-50 border-gray-200" 
                                : "bg-white border-gray-200"
                            }`}
                          >
                            {milestone.completed ? (
                              <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="size-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className={`text-sm ${milestone.completed ? "line-through text-muted-foreground" : ""}`}>
                                {milestone.title}
                              </p>
                              {!milestone.completed && milestone.priority === "high" && (
                                <span className="text-xs text-orange-600">High priority</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Suggested Project */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-start gap-3 mb-4">
                <Lightbulb className="size-6 text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="mb-1">Suggested Project This Semester</h3>
                  <p className="text-sm text-muted-foreground">
                    Aligned with your skill gaps and career goals
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2">{suggestedProject.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {suggestedProject.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestedProject.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm mb-2">Suggested steps:</p>
                  <ol className="space-y-1 text-sm text-muted-foreground">
                    {suggestedProject.steps.map((step, idx) => (
                      <li key={idx} className="ml-4">
                        {idx + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <Button className="w-full" variant="secondary">
                  Add to tasks
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Skill Gaps */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="size-5 text-blue-600" />
                <h3>Skill Gaps</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Top skills to develop for {targetRole} roles
              </p>

              <div className="space-y-4">
                {skillGaps.map((gap, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm">{gap.skill}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        gap.importance === "Critical" ? "bg-red-100 text-red-700" :
                        gap.importance === "High" ? "bg-orange-100 text-orange-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {gap.importance}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {gap.action}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h4 className="mb-2">Next Steps</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Complete your portfolio project</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Apply to 10+ internships by Feb 1</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Practice 3-4 LeetCode problems weekly</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
