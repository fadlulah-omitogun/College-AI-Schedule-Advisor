import { useState } from "react";
import AppNav from "../components/AppNav";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Plus, Calendar, Sparkles, Filter, ListTodo } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

type Route = "landing" | "login" | "signup" | "onboarding" | "dashboard" | "plan/academics" | "plan/career" | "tasks" | "chat";

interface TasksPageProps {
  onNavigate: (route: Route) => void;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  type: "academic" | "career" | "deadline" | "personal";
  completed: boolean;
  dueDate?: string;
  week: "current" | "backlog";
}

export default function TasksPage({ onNavigate }: TasksPageProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete CS 201 Assignment 4 - Binary Trees",
      description: "Implement AVL tree with insertion and deletion",
      type: "academic",
      completed: false,
      dueDate: "Jan 18, 2026",
      week: "current"
    },
    {
      id: "2",
      title: "Update resume with recent Python project",
      type: "career",
      completed: false,
      dueDate: "Jan 17, 2026",
      week: "current"
    },
    {
      id: "3",
      title: "Register for Spring 2026 courses",
      description: "Registration opens Jan 20",
      type: "deadline",
      completed: false,
      dueDate: "Jan 20, 2026",
      week: "current"
    },
    {
      id: "4",
      title: "Study for MATH 220 Midterm",
      type: "academic",
      completed: true,
      dueDate: "Jan 16, 2026",
      week: "current"
    },
    {
      id: "5",
      title: "Apply to Google internship",
      type: "career",
      completed: false,
      week: "current"
    },
    {
      id: "6",
      title: "Complete LeetCode problem set (10 problems)",
      type: "career",
      completed: false,
      week: "backlog"
    },
    {
      id: "7",
      title: "Start CS 301 readings for next semester",
      type: "academic",
      completed: false,
      week: "backlog"
    },
    {
      id: "8",
      title: "Attend career fair networking event",
      type: "career",
      completed: false,
      dueDate: "Jan 25, 2026",
      week: "backlog"
    },
  ]);

  const [filterType, setFilterType] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    type: "academic" as Task["type"],
    dueDate: "",
  });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description || undefined,
      type: newTask.type,
      completed: false,
      dueDate: newTask.dueDate || undefined,
      week: "current"
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", type: "academic", dueDate: "" });
    setIsAddDialogOpen(false);
  };

  const filterTasks = (taskList: Task[]) => {
    if (filterType === "all") return taskList;
    return taskList.filter(task => task.type === filterType);
  };

  const currentWeekTasks = filterTasks(tasks.filter(t => t.week === "current"));
  const backlogTasks = filterTasks(tasks.filter(t => t.week === "backlog"));

  const currentCompleted = currentWeekTasks.filter(t => t.completed).length;
  const currentTotal = currentWeekTasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AppNav currentRoute="tasks" onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Tasks</h1>
            <p className="text-muted-foreground">
              Stay on track with your academic and career goals
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Sparkles className="size-4" />
              Auto-plan next week
            </Button>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="size-4" />
                  Add task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-title">Task Title *</Label>
                    <Input
                      id="task-title"
                      placeholder="What do you need to do?"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-description">Description (optional)</Label>
                    <Textarea
                      id="task-description"
                      placeholder="Add more details..."
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-type">Type</Label>
                    <Select 
                      value={newTask.type} 
                      onValueChange={(value: Task["type"]) => setNewTask({ ...newTask, type: value })}
                    >
                      <SelectTrigger id="task-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-due">Due Date (optional)</Label>
                    <Input
                      id="task-due"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addTask}>Add Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filter */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="size-4 text-muted-foreground" />
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "academic" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilterType("academic")}
              >
                Academic
              </Button>
              <Button
                variant={filterType === "career" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilterType("career")}
              >
                Career
              </Button>
              <Button
                variant={filterType === "deadline" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilterType("deadline")}
              >
                Deadlines
              </Button>
              <Button
                variant={filterType === "personal" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilterType("personal")}
              >
                Personal
              </Button>
            </div>
          </div>
        </Card>

        {/* Tasks */}
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList>
            <TabsTrigger value="current">
              This Week ({currentCompleted}/{currentTotal})
            </TabsTrigger>
            <TabsTrigger value="backlog">
              Backlog ({backlogTasks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <Card className="p-6">
              {currentWeekTasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="size-12 mx-auto mb-3 opacity-20" />
                  <p>No tasks for this week</p>
                  <p className="text-sm mt-1">Add a task or auto-plan your week</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentWeekTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                        task.completed 
                          ? "bg-gray-50 border-gray-200" 
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <p className={`text-sm mb-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.type === "academic" ? "bg-blue-100 text-blue-700" :
                            task.type === "career" ? "bg-green-100 text-green-700" :
                            task.type === "deadline" ? "bg-orange-100 text-orange-700" :
                            "bg-purple-100 text-purple-700"
                          }`}>
                            {task.type}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="size-3" />
                              {task.dueDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="backlog">
            <Card className="p-6">
              {backlogTasks.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ListTodo className="size-12 mx-auto mb-3 opacity-20" />
                  <p>No backlog tasks</p>
                  <p className="text-sm mt-1">Future tasks will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {backlogTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                        task.completed 
                          ? "bg-gray-50 border-gray-200" 
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <p className={`text-sm mb-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.type === "academic" ? "bg-blue-100 text-blue-700" :
                            task.type === "career" ? "bg-green-100 text-green-700" :
                            task.type === "deadline" ? "bg-orange-100 text-orange-700" :
                            "bg-purple-100 text-purple-700"
                          }`}>
                            {task.type}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="size-3" />
                              {task.dueDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
