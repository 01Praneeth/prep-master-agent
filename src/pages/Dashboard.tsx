import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, Brain, Trophy, Target, TrendingUp, Clock, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [userExam, setUserExam] = useState("");
  const [currentStreak, setCurrentStreak] = useState(7);
  const [overallProgress, setOverallProgress] = useState(65);
  const [badgesEarned, setBadgesEarned] = useState(12);

  useEffect(() => {
    // Get user data from localStorage
    const name = localStorage.getItem("userName") || "Student";
    const exam = localStorage.getItem("userExam") || "Your Exam";
    setUserName(name);
    setUserExam(exam);
  }, []);

  const quickStats = [
    {
      title: "Overall Progress",
      value: `${overallProgress}%`,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Current Streak",
      value: `${currentStreak} days`,
      icon: Flame,
      color: "text-motivation",
      bgColor: "bg-motivation/10"
    },
    {
      title: "Badges Earned",
      value: badgesEarned,
      icon: Trophy,
      color: "text-achievement",
      bgColor: "bg-achievement/10"
    },
    {
      title: "Study Hours",
      value: "42h",
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  const recentActivities = [
    {
      type: "quiz",
      title: "Data Structures Quiz",
      score: "8/10",
      time: "2 hours ago",
      icon: Brain
    },
    {
      type: "study",
      title: "Algorithms Chapter 5",
      progress: "Completed",
      time: "5 hours ago",
      icon: BookOpen
    },
    {
      type: "achievement",
      title: "Week Warrior Badge",
      description: "7-day study streak",
      time: "1 day ago",
      icon: Trophy
    }
  ];

  const upcomingRevisions = [
    {
      topic: "Linear Data Structures",
      dueDate: "Today, 3:00 PM",
      priority: "high"
    },
    {
      topic: "Sorting Algorithms",
      dueDate: "Tomorrow, 10:00 AM",
      priority: "medium"
    },
    {
      topic: "Graph Theory Basics",
      dueDate: "Dec 30, 2:00 PM",
      priority: "low"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden">
          <Card className="study-card border-0 bg-gradient-to-r from-primary/10 via-achievement/10 to-success/10">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Welcome back, {userName}! 👋
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    Ready to continue your {userExam} preparation?
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="px-3 py-1">
                      <Flame className="w-4 h-4 mr-2 text-motivation" />
                      {currentStreak} Day Streak
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      <Target className="w-4 h-4 mr-2 text-primary" />
                      {overallProgress}% Complete
                    </Badge>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-primary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="study-card hover:card-hover border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {activity.score || activity.progress || activity.description} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                  <Link to="/study-plan">
                    <Button className="w-full btn-hero">
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Revisions */}
          <div>
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Revisions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingRevisions.map((revision, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      revision.priority === 'high' ? 'bg-destructive' :
                      revision.priority === 'medium' ? 'bg-motivation' : 'bg-success'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{revision.topic}</p>
                      <p className="text-xs text-muted-foreground">{revision.dueDate}</p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-3">
                  <Link to="/revision">
                    <Button variant="outline" className="w-full">
                      View All Revisions
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="study-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Study Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="progress-glow" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-sm text-muted-foreground">Topics Studied</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">89</p>
                  <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">94%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quizzes" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Brain className="w-4 h-4 mr-2" />
                    Take Quiz
                  </Button>
                </Link>
                <Link to="/study-plan" className="flex-1">
                  <Button className="w-full btn-success">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Study Plan
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;