import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, Target, TrendingUp, Users, Trophy } from "lucide-react";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Study Plans",
      description: "Personalized study schedules that adapt to your learning pace and exam requirements."
    },
    {
      icon: Target,
      title: "Smart Quiz System",
      description: "Targeted practice questions that identify and strengthen your weak areas."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Real-time analytics and progress visualization to keep you motivated."
    },
    {
      icon: BookOpen,
      title: "Revision Management",
      description: "Spaced repetition system for optimal knowledge retention and recall."
    },
    {
      icon: Users,
      title: "Multi-Agent Support",
      description: "Dedicated AI agents for teaching, quizzing, and revision assistance."
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Gamified learning with streaks, badges, and milestone celebrations."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StudyPilot AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">Login</Link>
              <Link to="/register">
                <Button variant="default" className="btn-hero">Get Started</Button>
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-6 h-0.5 bg-foreground transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-foreground transition-all mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-foreground transition-all mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-muted-foreground hover:text-foreground">Features</a>
              <a href="#pricing" className="block px-3 py-2 text-muted-foreground hover:text-foreground">Pricing</a>
              <Link to="/login" className="block px-3 py-2 text-muted-foreground hover:text-foreground">Login</Link>
              <Link to="/register" className="block px-3 py-2">
                <Button variant="default" className="w-full btn-hero">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-achievement/5 to-success/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Master Your Exams with
              <span className="bg-gradient-to-r from-primary to-achievement bg-clip-text text-transparent"> AI-Powered</span> Preparation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              An adaptive multi-agent system that creates personalized study plans, generates targeted quizzes, 
              and provides intelligent revision schedules for optimal exam preparation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="btn-hero animate-bounce-subtle">
                  Start Learning Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Intelligent Learning Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI agents designed to maximize your learning efficiency and exam success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="study-card hover:card-hover animate-slide-up border-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-achievement/10 to-success/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Study Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who have improved their exam performance with StudyPilot AI
            </p>
            <Link to="/register">
              <Button size="lg" className="btn-hero">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StudyPilot AI</span>
            </div>
            <div className="flex space-x-6 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 StudyPilot AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;