import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, GraduationCap, MapPin, Bell, Shield, Eye, EyeOff, Trophy, Target, TrendingUp } from "lucide-react";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    targetExam: "",
    weakAreas: "",
    studyHours: "2",
    notifications: true,
    emailUpdates: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const { toast } = useToast();

  useEffect(() => {
    // Load user data from localStorage
    const userData = {
      name: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || "",
      targetExam: localStorage.getItem("userExam") || ""
    };
    setProfileData(prev => ({ ...prev, ...userData }));
  }, []);

  const achievements = [
    { id: 1, name: "First Quiz", description: "Completed your first quiz", icon: "🎯", earned: true },
    { id: 2, name: "Week Warrior", description: "7-day study streak", icon: "🔥", earned: true },
    { id: 3, name: "Quiz Master", description: "Scored 90%+ on 5 quizzes", icon: "🧠", earned: true },
    { id: 4, name: "Consistent Learner", description: "30-day study streak", icon: "⭐", earned: false },
    { id: 5, name: "Perfect Score", description: "Got 100% on any quiz", icon: "💯", earned: false },
    { id: 6, name: "Knowledge Seeker", description: "Completed 50 topics", icon: "📚", earned: false }
  ];

  const studyStats = {
    totalStudyHours: 42,
    quizzesCompleted: 23,
    averageScore: 87,
    currentStreak: 7,
    longestStreak: 12,
    topicsCompleted: 34
  };

  const exams = [
    "UPSC CSE (IAS/IPS/IFS)",
    "GATE",
    "CAT",
    "JEE Main/Advanced",
    "NEET",
    "SSC CGL",
    "Banking (SBI PO/IBPS)",
    "RRB NTPC",
    "State PCS",
    "Other"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update localStorage
      localStorage.setItem("userName", profileData.name);
      localStorage.setItem("userEmail", profileData.email);
      localStorage.setItem("userExam", profileData.targetExam);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = async () => {
    if (!profileData.currentPassword || !profileData.newPassword || !profileData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (profileData.newPassword.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      });
      
      // Clear password fields
      setProfileData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } catch (error) {
      toast({
        title: "Password Change Failed",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <User className="w-8 h-8 text-primary" />
            Profile
          </h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Preferences */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Study Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetExam">Target Exam</Label>
                    <Select value={profileData.targetExam} onValueChange={(value) => handleInputChange("targetExam", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your target exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {exams.map((exam) => (
                          <SelectItem key={exam} value={exam}>
                            {exam}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studyHours">Daily Study Hours</Label>
                    <Select value={profileData.studyHours} onValueChange={(value) => handleInputChange("studyHours", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="5">5+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weakAreas">Weak Areas</Label>
                  <Textarea
                    id="weakAreas"
                    value={profileData.weakAreas}
                    onChange={(e) => handleInputChange("weakAreas", e.target.value)}
                    placeholder="List topics you find challenging (comma-separated)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Get study reminders and updates</p>
                  </div>
                  <Switch
                    checked={profileData.notifications}
                    onCheckedChange={(checked) => handleInputChange("notifications", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Updates</p>
                    <p className="text-sm text-muted-foreground">Receive weekly progress reports</p>
                  </div>
                  <Switch
                    checked={profileData.emailUpdates}
                    onCheckedChange={(checked) => handleInputChange("emailUpdates", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={profileData.currentPassword}
                      onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) => handleInputChange("newPassword", e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                <Button onClick={handleChangePassword} variant="outline">
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex gap-4">
              <Button onClick={handleSaveProfile} className="btn-hero">
                Save Changes
              </Button>
              <Button variant="outline">
                Cancel
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Statistics */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Study Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-foreground">{studyStats.totalStudyHours}h</p>
                    <p className="text-xs text-muted-foreground">Total Hours</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-foreground">{studyStats.quizzesCompleted}</p>
                    <p className="text-xs text-muted-foreground">Quizzes</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-foreground">{studyStats.averageScore}%</p>
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-lg font-bold text-foreground">{studyStats.currentStreak}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Topics Completed</span>
                    <span className="font-medium text-foreground">{studyStats.topicsCompleted}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${studyStats.topicsCompleted}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="study-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-achievement/10 border border-achievement/20' : 'bg-muted/30'
                    }`}
                  >
                    <div className={`text-lg ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${
                        achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Badge className="achievement-badge text-xs">
                        Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;