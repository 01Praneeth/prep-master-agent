import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Briefcase, Calendar, MapPin, ExternalLink, Bell, Search, Filter } from "lucide-react";

const JobUpdates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const jobUpdates = [
    {
      id: "1",
      title: "Software Developer - Government Sector",
      organization: "Ministry of Electronics & IT",
      type: "Government",
      location: "New Delhi",
      deadline: "Jan 15, 2024",
      publishedDate: "Dec 20, 2023",
      category: "Technology",
      vacancies: 45,
      description: "Hiring software developers for digital India initiatives. Experience in full-stack development required.",
      requirements: ["B.Tech/B.E. in Computer Science", "2+ years experience", "Full-stack development skills"],
      salary: "₹7,00,000 - ₹12,00,000 per annum",
      applyLink: "https://example.com/apply1",
      isNew: true,
      priority: "high"
    },
    {
      id: "2",
      title: "Data Scientist - Public Sector",
      organization: "Indian Space Research Organisation",
      type: "PSU",
      location: "Bangalore",
      deadline: "Jan 20, 2024",
      publishedDate: "Dec 18, 2023",
      category: "Data Science",
      vacancies: 12,
      description: "Join ISRO's data science team to work on satellite data analysis and space mission planning.",
      requirements: ["M.Tech/PhD in relevant field", "Machine Learning expertise", "Python/R proficiency"],
      salary: "₹9,00,000 - ₹15,00,000 per annum",
      applyLink: "https://example.com/apply2",
      isNew: true,
      priority: "high"
    },
    {
      id: "3",
      title: "Civil Engineer - Infrastructure Projects",
      organization: "National Highways Authority",
      type: "Government",
      location: "Multiple Locations",
      deadline: "Jan 25, 2024",
      publishedDate: "Dec 15, 2023",
      category: "Engineering",
      vacancies: 78,
      description: "Civil engineers needed for national highway construction and maintenance projects.",
      requirements: ["B.Tech in Civil Engineering", "Site experience preferred", "Project management skills"],
      salary: "₹6,50,000 - ₹11,00,000 per annum",
      applyLink: "https://example.com/apply3",
      isNew: false,
      priority: "medium"
    },
    {
      id: "4",
      title: "Financial Analyst - Banking Sector",
      organization: "State Bank of India",
      type: "Banking",
      location: "Mumbai",
      deadline: "Feb 1, 2024",
      publishedDate: "Dec 10, 2023",
      category: "Finance",
      vacancies: 25,
      description: "Analyze financial data and assist in investment decisions for one of India's largest banks.",
      requirements: ["CA/CFA qualification", "Banking experience", "Financial modeling skills"],
      salary: "₹8,00,000 - ₹14,00,000 per annum",
      applyLink: "https://example.com/apply4",
      isNew: false,
      priority: "medium"
    }
  ];

  const categories = ["all", "Technology", "Data Science", "Engineering", "Finance", "Administration"];

  const filteredJobs = jobUpdates.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-motivation text-white";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Government": return "bg-primary text-primary-foreground";
      case "PSU": return "bg-achievement text-achievement-foreground";
      case "Banking": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const addToCalendar = (job: any) => {
    const title = `Application Deadline: ${job.title}`;
    const details = `Deadline for ${job.organization} - ${job.title}`;
    const date = new Date(job.deadline).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//StudyPilot AI//EN
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${date}
DESCRIPTION:${details}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${job.title.replace(/\s+/g, '-')}-deadline.ics`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="w-8 h-8 text-primary" />
              Job Updates
            </h1>
            <p className="text-muted-foreground">Latest opportunities and exam notifications</p>
          </div>
          
          <Button className="btn-hero">
            <Bell className="w-4 h-4 mr-2" />
            Enable Notifications
          </Button>
        </div>

        {/* Filters */}
        <Card className="study-card border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs or organizations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "btn-hero" : ""}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="study-card border-0">
            <CardContent className="p-6 text-center">
              <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{filteredJobs.length}</p>
              <p className="text-sm text-muted-foreground">Active Openings</p>
            </CardContent>
          </Card>
          
          <Card className="study-card border-0">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-motivation mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {filteredJobs.filter(job => job.isNew).length}
              </p>
              <p className="text-sm text-muted-foreground">New This Week</p>
            </CardContent>
          </Card>
          
          <Card className="study-card border-0">
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Locations</p>
            </CardContent>
          </Card>
          
          <Card className="study-card border-0">
            <CardContent className="p-6 text-center">
              <Bell className="w-8 h-8 text-achievement mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Deadlines This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="study-card hover:card-hover border-0">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                        {job.isNew && (
                          <Badge className="bg-achievement text-achievement-foreground text-xs animate-pulse-glow">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <Badge className={`text-xs ${getPriorityColor(job.priority)}`}>
                        {job.priority.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{job.organization}</span>
                      <Badge className={`text-xs ${getTypeColor(job.type)}`}>
                        {job.type}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Deadline: {job.deadline}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div>
                        <span className="text-sm font-medium text-foreground">Requirements: </span>
                        <span className="text-sm text-muted-foreground">
                          {job.requirements.join(" • ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">Salary: </span>
                        <span className="text-sm text-muted-foreground">{job.salary}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">Vacancies: </span>
                        <span className="text-sm text-muted-foreground">{job.vacancies}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 lg:w-48">
                    <a 
                      href={job.applyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full btn-hero">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    </a>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => addToCalendar(job)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Add Deadline
                    </Button>
                    
                    <div className="text-xs text-muted-foreground text-center">
                      Published: {job.publishedDate}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <Card className="study-card border-0">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobUpdates;