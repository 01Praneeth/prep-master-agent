import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, BookOpen, Clock, Target, List, BarChart3, Download } from "lucide-react";

const StudyPlan = () => {
  const [viewMode, setViewMode] = useState<"list" | "table">("list");
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const studyPlan = [
    {
      id: "day1-morning",
      day: "Day 1",
      period: "Morning",
      topic: "Data Structures",
      subtopics: ["Arrays", "Linked Lists", "Stacks"],
      task: "Study basic data structures and their implementations",
      resources: [
        { title: "Array Tutorial", link: "https://example.com/arrays" },
        { title: "Stack Implementation", link: "https://example.com/stacks" }
      ],
      pyqs: [
        { title: "Arrays PYQ 2023", link: "https://example.com/arrays-pyq" },
        { title: "Stack PYQ 2022", link: "https://example.com/stack-pyq" }
      ],
      duration: "2 hours",
      difficulty: "Beginner"
    },
    {
      id: "day1-afternoon",
      day: "Day 1",
      period: "Afternoon",
      topic: "Algorithms",
      subtopics: ["Sorting", "Searching", "Time Complexity"],
      task: "Learn basic sorting algorithms and their complexity",
      resources: [
        { title: "Sorting Algorithms", link: "https://example.com/sorting" },
        { title: "Binary Search", link: "https://example.com/binary-search" }
      ],
      pyqs: [
        { title: "Sorting PYQ 2023", link: "https://example.com/sorting-pyq" }
      ],
      duration: "2.5 hours",
      difficulty: "Intermediate"
    },
    {
      id: "day1-evening",
      day: "Day 1",
      period: "Evening",
      topic: "Practice Session",
      subtopics: ["Coding Problems", "MCQs"],
      task: "Solve practice problems on today's topics",
      resources: [],
      pyqs: [
        { title: "Mixed Practice Set", link: "https://example.com/practice" }
      ],
      duration: "1.5 hours",
      difficulty: "Mixed"
    },
    {
      id: "day2-morning",
      day: "Day 2",
      period: "Morning",
      topic: "Advanced Data Structures",
      subtopics: ["Trees", "Graphs", "Hash Tables"],
      task: "Study tree structures and graph representations",
      resources: [
        { title: "Binary Trees", link: "https://example.com/trees" },
        { title: "Graph Theory", link: "https://example.com/graphs" }
      ],
      pyqs: [
        { title: "Trees PYQ 2023", link: "https://example.com/trees-pyq" }
      ],
      duration: "3 hours",
      difficulty: "Advanced"
    }
  ];

  const handleTaskComplete = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const completionRate = (completedTasks.size / studyPlan.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-motivation text-white";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              Study Plan
            </h1>
            <p className="text-muted-foreground">Your personalized learning schedule</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "btn-hero" : ""}
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "btn-hero" : ""}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Table View
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="study-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm text-muted-foreground">{Math.round(completionRate)}%</span>
                </div>
                <Progress value={completionRate} className="progress-glow" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{completedTasks.size}</p>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{studyPlan.length - completedTasks.size}</p>
                  <p className="text-sm text-muted-foreground">Tasks Remaining</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">8.5h</p>
                  <p className="text-sm text-muted-foreground">Total Study Time</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Plan Content */}
        {viewMode === "list" ? (
          /* List View */
          <div className="space-y-4">
            {studyPlan.map((item) => (
              <Card 
                key={item.id} 
                className={`study-card border-0 transition-all ${
                  completedTasks.has(item.id) ? 'opacity-75 bg-success/5' : 'hover:card-hover'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={completedTasks.has(item.id)}
                      onCheckedChange={() => handleTaskComplete(item.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {item.day} • {item.period}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className={`text-lg font-semibold mb-2 ${
                        completedTasks.has(item.id) ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}>
                        {item.topic}
                      </h3>
                      
                      <p className="text-muted-foreground mb-3">{item.task}</p>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-foreground">Subtopics: </span>
                          <span className="text-sm text-muted-foreground">
                            {item.subtopics.join(", ")}
                          </span>
                        </div>
                        
                        {item.resources.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-foreground">Resources: </span>
                            {item.resources.map((resource, idx) => (
                              <a
                                key={idx}
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:text-primary-dark underline mr-2"
                              >
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        )}
                        
                        {item.pyqs.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-foreground">Practice: </span>
                            {item.pyqs.map((pyq, idx) => (
                              <a
                                key={idx}
                                href={pyq.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:text-primary-dark underline mr-2"
                              >
                                {pyq.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Table View */
          <Card className="study-card border-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-medium text-foreground">Done</th>
                      <th className="text-left p-4 font-medium text-foreground">Day</th>
                      <th className="text-left p-4 font-medium text-foreground">Period</th>
                      <th className="text-left p-4 font-medium text-foreground">Topic</th>
                      <th className="text-left p-4 font-medium text-foreground">Task</th>
                      <th className="text-left p-4 font-medium text-foreground">Duration</th>
                      <th className="text-left p-4 font-medium text-foreground">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studyPlan.map((item) => (
                      <tr 
                        key={item.id}
                        className={`border-b border-border hover:bg-muted/30 transition-colors ${
                          completedTasks.has(item.id) ? 'bg-success/5' : ''
                        }`}
                      >
                        <td className="p-4">
                          <Checkbox
                            checked={completedTasks.has(item.id)}
                            onCheckedChange={() => handleTaskComplete(item.id)}
                          />
                        </td>
                        <td className="p-4 text-foreground">{item.day}</td>
                        <td className="p-4 text-foreground">{item.period}</td>
                        <td className="p-4">
                          <span className={completedTasks.has(item.id) ? 'line-through text-muted-foreground' : 'text-foreground font-medium'}>
                            {item.topic}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground max-w-xs truncate">{item.task}</td>
                        <td className="p-4 text-muted-foreground">{item.duration}</td>
                        <td className="p-4">
                          <Badge className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 btn-hero">
            <Calendar className="w-4 h-4 mr-2" />
            Add to Calendar
          </Button>
          <Button variant="outline" className="flex-1">
            <Target className="w-4 h-4 mr-2" />
            Customize Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;