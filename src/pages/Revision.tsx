import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Download, Bell, BookOpen, RefreshCcw } from "lucide-react";

const Revision = () => {
  const [selectedView, setSelectedView] = useState<"timeline" | "calendar">("timeline");

  const revisionSchedule = [
    {
      id: "1",
      topic: "Data Structures - Arrays & Linked Lists",
      scheduledDate: "Today",
      scheduledTime: "3:00 PM",
      priority: "high",
      cycleDay: "Day 1",
      lastReviewed: "2 days ago",
      nextReview: "Today",
      confidence: 85,
      status: "pending"
    },
    {
      id: "2",
      topic: "Algorithms - Sorting Techniques",
      scheduledDate: "Tomorrow",
      scheduledTime: "10:00 AM",
      priority: "medium",
      cycleDay: "Day 3",
      lastReviewed: "5 days ago",
      nextReview: "Tomorrow",
      confidence: 70,
      status: "pending"
    },
    {
      id: "3",
      topic: "Programming Fundamentals",
      scheduledDate: "Dec 30",
      scheduledTime: "2:00 PM",
      priority: "low",
      cycleDay: "Day 7",
      lastReviewed: "1 week ago",
      nextReview: "Dec 30",
      confidence: 92,
      status: "pending"
    },
    {
      id: "4",
      topic: "Database Concepts",
      scheduledDate: "Yesterday",
      scheduledTime: "4:00 PM",
      priority: "high",
      cycleDay: "Day 1",
      lastReviewed: "Yesterday",
      nextReview: "Jan 2",
      confidence: 78,
      status: "completed"
    }
  ];

  const upcomingReminders = [
    {
      topic: "Linear Data Structures",
      time: "In 2 hours",
      priority: "high"
    },
    {
      topic: "Search Algorithms",
      time: "Tomorrow 10:00 AM",
      priority: "medium"
    },
    {
      topic: "Graph Theory",
      time: "Dec 31, 3:00 PM",
      priority: "low"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-motivation text-white";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-motivation";
    return "text-destructive";
  };

  const handleMarkAsReviewed = (id: string) => {
    // Here you would update the revision status
    console.log("Marking as reviewed:", id);
  };

  const handleGenerateICS = () => {
    // Generate and download ICS file
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//StudyPilot AI//EN
${revisionSchedule.map(item => `
BEGIN:VEVENT
SUMMARY:Revision: ${item.topic}
DTSTART:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DURATION:PT1H
DESCRIPTION:Spaced repetition review for ${item.topic}
END:VEVENT`).join('')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'revision-schedule.ics';
    link.click();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <RefreshCcw className="w-8 h-8 text-primary" />
              Revision Schedule
            </h1>
            <p className="text-muted-foreground">Spaced repetition for optimal retention</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={selectedView === "timeline" ? "default" : "outline"}
              onClick={() => setSelectedView("timeline")}
              className={selectedView === "timeline" ? "btn-hero" : ""}
            >
              <Clock className="w-4 h-4 mr-2" />
              Timeline
            </Button>
            <Button
              variant={selectedView === "calendar" ? "default" : "outline"}
              onClick={() => setSelectedView("calendar")}
              className={selectedView === "calendar" ? "btn-hero" : ""}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </Button>
            <Button variant="outline" onClick={handleGenerateICS}>
              <Download className="w-4 h-4 mr-2" />
              Export .ics
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revision Items */}
            <div className="space-y-4">
              {revisionSchedule.map((item, index) => (
                <Card 
                  key={item.id} 
                  className={`study-card border-0 ${
                    item.status === 'completed' ? 'opacity-75 bg-success/5' : 'hover:card-hover'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                            {item.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.cycleDay}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {item.scheduledDate}, {item.scheduledTime}
                          </div>
                        </div>
                        
                        <h3 className={`text-lg font-semibold mb-2 ${
                          item.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}>
                          {item.topic}
                        </h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Last Reviewed:</span>
                            <p className="font-medium text-foreground">{item.lastReviewed}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Next Review:</span>
                            <p className="font-medium text-foreground">{item.nextReview}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Confidence:</span>
                            <p className={`font-medium ${getConfidenceColor(item.confidence)}`}>
                              {item.confidence}%
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {item.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkAsReviewed(item.id)}
                            className="btn-success"
                          >
                            Mark as Reviewed
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <BookOpen className="w-4 h-4 mr-1" />
                          Study
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Spaced Repetition Info */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCcw className="w-5 h-5 text-primary" />
                  How Spaced Repetition Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Our adaptive system schedules reviews based on your performance and the forgetting curve:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">Same Day</p>
                      <p className="text-xs text-muted-foreground">Initial review</p>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-sm font-bold text-primary">3</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">Day 3</p>
                      <p className="text-xs text-muted-foreground">First spaced review</p>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-sm font-bold text-primary">7</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">Day 7+</p>
                      <p className="text-xs text-muted-foreground">Long-term retention</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Reminders */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Upcoming Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingReminders.map((reminder, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      reminder.priority === 'high' ? 'bg-destructive' :
                      reminder.priority === 'medium' ? 'bg-motivation' : 'bg-success'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{reminder.topic}</p>
                      <p className="text-xs text-muted-foreground">{reminder.time}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  <Bell className="w-4 h-4 mr-2" />
                  Manage Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle>Revision Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-sm text-muted-foreground">Topics in Cycle</p>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">86%</p>
                  <p className="text-sm text-muted-foreground">Avg Confidence</p>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Due Today</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revision;