import { useState } from "react";
import AppNav from "../components/AppNav";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Send, Bot, User, Info } from "lucide-react";

type Route = "landing" | "login" | "signup" | "onboarding" | "dashboard" | "plan/academics" | "plan/career" | "tasks" | "chat";

interface AdvisorChatProps {
  onNavigate: (route: Route) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AdvisorChat({ onNavigate }: AdvisorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi Alex! I'm your AI academic advisor. I have access to your profile, academic plan, and career goals. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  // Mock context data
  const contextData = {
    major: "Computer Science",
    year: "Sophomore",
    targetRole: "Software Engineer",
    nextSemesterCourses: ["CS 301: Algorithms", "CS 310: Database Systems", "STAT 200: Statistics", "PHIL 200: Ethics"],
    thisWeekTasks: [
      "Complete CS 201 Assignment 4",
      "Update resume",
      "Register for Spring 2026 courses"
    ],
    degreeProgress: 62,
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("graduation") || lowerQuery.includes("graduate")) {
      return "Based on your current progress (62% complete), you're on track to graduate in May 2027. You have 46 credits remaining to complete your Computer Science degree. Would you like me to show you a breakdown of remaining requirements?";
    }
    
    if (lowerQuery.includes("course") || lowerQuery.includes("class") || lowerQuery.includes("semester")) {
      return `For Spring 2026, I've planned these courses for you:\n\n• CS 301: Algorithms (4 cr) - Core requirement\n• CS 310: Database Systems (3 cr) - Core requirement\n• STAT 200: Statistics (3 cr) - Math requirement\n• PHIL 200: Ethics (3 cr) - Humanities elective\n\nThis gives you 13 credits with a balanced workload. Would you like to adjust this plan?`;
    }

    if (lowerQuery.includes("internship") || lowerQuery.includes("job") || lowerQuery.includes("career")) {
      return "Based on your goal of becoming a Software Engineer, here's what I recommend:\n\n1. Apply to 10-15 summer internships by Feb 1\n2. Focus on companies hiring entry-level: Google, Microsoft, startups\n3. Your resume needs one more strong project - consider the full-stack app we suggested\n4. Practice 3-4 LeetCode problems weekly\n\nWould you like me to break down specific internship application steps?";
    }

    if (lowerQuery.includes("task") || lowerQuery.includes("to do") || lowerQuery.includes("this week")) {
      return `This week you have 5 tasks:\n\n✓ Study for MATH 220 Midterm (completed)\n• Complete CS 201 Assignment 4 (due Jan 18)\n• Update resume with Python project (due Jan 17)\n• Register for Spring 2026 courses (Jan 20)\n• Apply to 3 summer internships\n\nYou've completed 1 out of 5 tasks. Want help breaking down any of these?`;
    }

    if (lowerQuery.includes("prerequisite") || lowerQuery.includes("prereq")) {
      return "I'll check your prerequisites. For CS 301 (Algorithms) next semester, you need:\n\n✓ CS 201: Data Structures (completed Fall 2025)\n✓ MATH 220: Discrete Math (completed Spring 2025)\n✓ Grade B+ or higher in CS 201\n\nYou're all set for CS 301! Any other courses you want me to check?";
    }

    // Default response
    return "I can help you with questions about your academic plan, career goals, course selection, degree requirements, and upcoming tasks. Based on your profile:\n\n• Major: Computer Science\n• Year: Sophomore\n• Target role: Software Engineer\n• Degree progress: 62%\n\nWhat would you like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AppNav currentRoute="chat" onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2">AI Advisor</h1>
          <p className="text-muted-foreground">
            Ask me anything about your academic plan, career goals, or courses
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="flex flex-col h-[calc(100vh-16rem)]">
              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Bot className="size-4 text-blue-600" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-100 text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {message.role === "user" && (
                        <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <User className="size-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your plan, courses, or career..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                    <Send className="size-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send
                </p>
              </div>
            </Card>

            {/* Suggested Questions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("When will I graduate?")}
              >
                When will I graduate?
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("What should I do for my career this semester?")}
              >
                Career advice
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("Am I ready for CS 301?")}
              >
                Check prerequisites
              </Button>
            </div>
          </div>

          {/* Context Sidebar */}
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Info className="size-4 text-blue-600" />
                <h4 className="text-sm">Context I'm Using</h4>
              </div>
              
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Profile</p>
                  <p>Major: {contextData.major}</p>
                  <p>Year: {contextData.year}</p>
                  <p>Goal: {contextData.targetRole}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Progress</p>
                  <p>{contextData.degreeProgress}% complete</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Next Semester</p>
                  <ul className="space-y-1 text-xs">
                    {contextData.nextSemesterCourses.map((course, idx) => (
                      <li key={idx} className="text-muted-foreground">• {course}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">This Week</p>
                  <ul className="space-y-1 text-xs">
                    {contextData.thisWeekTasks.map((task, idx) => (
                      <li key={idx} className="text-muted-foreground">• {task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <h4 className="text-sm mb-2">How I work</h4>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>✓ I cite your actual plan data</li>
                <li>✓ I never hallucinate information</li>
                <li>✓ I'll ask you to update your profile if I need more context</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}