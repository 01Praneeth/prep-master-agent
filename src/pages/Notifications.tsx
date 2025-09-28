import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Check, X, Settings, BookOpen, Brain, Calendar, Briefcase, Trophy } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "study",
      title: "Study Reminder: Data Structures",
      message: "Time for your morning study session on Arrays and Linked Lists",
      timestamp: "5 minutes ago",
      isRead: false,
      icon: BookOpen,
      color: "text-primary"
    },
    {
      id: "2",
      type: "quiz",
      title: "Quiz Results Available",
      message: "Your Algorithm Complexity quiz results are ready. You scored 9/10!",
      timestamp: "2 hours ago",
      isRead: false,
      icon: Brain,
      color: "text-success"
    },
    {
      id: "3",
      type: "revision",
      title: "Revision Due: Programming Fundamentals",
      message: "Your spaced repetition review is scheduled for today at 3:00 PM",
      timestamp: "4 hours ago",
      isRead: true,
      icon: Calendar,
      color: "text-motivation"
    },
    {
      id: "4",
      type: "job",
      title: "New Job Opening",
      message: "Software Developer position at Ministry of Electronics & IT - Deadline: Jan 15",
      timestamp: "1 day ago",
      isRead: false,
      icon: Briefcase,
      color: "text-achievement"
    },
    {
      id: "5",
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "Congratulations! You've earned the 'Week Warrior' badge for maintaining a 7-day streak",
      timestamp: "2 days ago",
      isRead: true,
      icon: Trophy,
      color: "text-achievement"
    },
    {
      id: "6",
      type: "study",
      title: "Study Plan Updated",
      message: "Your personalized study plan has been updated based on recent quiz performance",
      timestamp: "3 days ago",
      isRead: true,
      icon: BookOpen,
      color: "text-primary"
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    studyReminders: true,
    quizResults: true,
    revisionAlerts: true,
    jobUpdates: true,
    achievements: true,
    weeklyReports: false,
    emailNotifications: true,
    pushNotifications: true
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updateSetting = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "study": return "bg-primary/10 border-primary/20";
      case "quiz": return "bg-success/10 border-success/20";
      case "revision": return "bg-motivation/10 border-motivation/20";
      case "job": return "bg-achievement/10 border-achievement/20";
      case "achievement": return "bg-achievement/10 border-achievement/20";
      default: return "bg-muted/10 border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Bell className="w-8 h-8 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-destructive text-destructive-foreground animate-pulse-glow">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">Stay updated with your learning progress</p>
          </div>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
            <Button variant="outline" onClick={clearAllNotifications}>
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            {notifications.length === 0 ? (
              <Card className="study-card border-0">
                <CardContent className="p-12 text-center">
                  <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! New notifications will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`study-card border-0 transition-all ${
                    !notification.isRead ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                  } ${getTypeColor(notification.type)}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0 ${
                        !notification.isRead ? 'ring-2 ring-primary/30' : ''
                      }`}>
                        <notification.icon className={`w-5 h-5 ${notification.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className={`font-semibold ${
                            !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {notification.timestamp}
                          </span>
                          
                          <div className="flex gap-2">
                            {!notification.isRead && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs"
                              >
                                Mark as read
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-xs text-destructive hover:text-destructive"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Notification Settings */}
          <div className="space-y-6">
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Study Reminders</p>
                      <p className="text-xs text-muted-foreground">Get notified about study sessions</p>
                    </div>
                    <Switch
                      checked={notificationSettings.studyReminders}
                      onCheckedChange={(checked) => updateSetting('studyReminders', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Quiz Results</p>
                      <p className="text-xs text-muted-foreground">Notifications when quiz results are ready</p>
                    </div>
                    <Switch
                      checked={notificationSettings.quizResults}
                      onCheckedChange={(checked) => updateSetting('quizResults', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Revision Alerts</p>
                      <p className="text-xs text-muted-foreground">Spaced repetition reminders</p>
                    </div>
                    <Switch
                      checked={notificationSettings.revisionAlerts}
                      onCheckedChange={(checked) => updateSetting('revisionAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Job Updates</p>
                      <p className="text-xs text-muted-foreground">New job postings and deadlines</p>
                    </div>
                    <Switch
                      checked={notificationSettings.jobUpdates}
                      onCheckedChange={(checked) => updateSetting('jobUpdates', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Achievements</p>
                      <p className="text-xs text-muted-foreground">Badge unlocks and milestones</p>
                    </div>
                    <Switch
                      checked={notificationSettings.achievements}
                      onCheckedChange={(checked) => updateSetting('achievements', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Weekly Reports</p>
                      <p className="text-xs text-muted-foreground">Progress summaries</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                    />
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle>Notification Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total notifications</span>
                  <span className="font-medium text-foreground">{notifications.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Unread</span>
                  <span className="font-medium text-foreground">{unreadCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This week</span>
                  <span className="font-medium text-foreground">
                    {notifications.filter(n => 
                      n.timestamp.includes('day ago') || 
                      n.timestamp.includes('hours ago') || 
                      n.timestamp.includes('minutes ago')
                    ).length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;