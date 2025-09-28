import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, Clock, CheckCircle, AlertCircle, Trophy } from "lucide-react";

const Quizzes = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const availableQuizzes = [
    {
      id: "data-structures",
      title: "Data Structures Fundamentals",
      questions: 10,
      duration: "15 mins",
      difficulty: "Intermediate",
      topics: ["Arrays", "Linked Lists", "Stacks", "Queues"],
      attempted: true,
      lastScore: 8
    },
    {
      id: "algorithms",
      title: "Algorithm Complexity",
      questions: 12,
      duration: "20 mins",
      difficulty: "Advanced",
      topics: ["Big O", "Sorting", "Searching", "Dynamic Programming"],
      attempted: false,
      lastScore: null
    },
    {
      id: "programming",
      title: "Programming Concepts",
      questions: 8,
      duration: "12 mins",
      difficulty: "Beginner",
      topics: ["Variables", "Functions", "Loops", "Conditionals"],
      attempted: true,
      lastScore: 7
    }
  ];

  const sampleQuestions = [
    {
      id: 1,
      question: "What is the time complexity of accessing an element in an array by index?",
      options: {
        a: "O(1)",
        b: "O(n)",
        c: "O(log n)",
        d: "O(n²)"
      },
      correct: "a",
      explanation: "Array elements can be accessed directly using their index, which takes constant time regardless of array size."
    },
    {
      id: 2,
      question: "Which data structure follows the Last In First Out (LIFO) principle?",
      options: {
        a: "Queue",
        b: "Array",
        c: "Stack",
        d: "Linked List"
      },
      correct: "c",
      explanation: "A stack follows LIFO principle where the last element added is the first one to be removed."
    },
    {
      id: 3,
      question: "What is the worst-case time complexity of bubble sort?",
      options: {
        a: "O(n)",
        b: "O(n log n)",
        c: "O(n²)",
        d: "O(2^n)"
      },
      correct: "c",
      explanation: "Bubble sort has O(n²) worst-case complexity when the array is sorted in reverse order."
    }
  ];

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and show results
      let correctAnswers = 0;
      sampleQuestions.forEach((q, index) => {
        if (answers[index] === q.correct) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setShowResults(true);
    }
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setShowResults(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-motivation text-white";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  if (showResults) {
    const percentage = (score / sampleQuestions.length) * 100;
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="study-card border-0 text-center">
            <CardContent className="p-8">
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-achievement mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h2>
                <p className="text-muted-foreground">Here are your results</p>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-achievement/10 rounded-2xl p-6 mb-6">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {score}/{sampleQuestions.length}
                </div>
                <div className="text-xl text-muted-foreground mb-4">
                  {percentage.toFixed(0)}% Score
                </div>
                <Progress value={percentage} className="progress-glow" />
              </div>

              <div className="space-y-4 mb-8">
                {sampleQuestions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correct;
                  
                  return (
                    <div key={question.id} className="text-left p-4 rounded-lg bg-muted/50">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-foreground mb-2">
                            Q{index + 1}: {question.question}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            Your answer: <span className={isCorrect ? "text-success" : "text-destructive"}>
                              {question.options[userAnswer as keyof typeof question.options] || "Not answered"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-muted-foreground mb-1">
                              Correct answer: <span className="text-success">
                                {question.options[question.correct as keyof typeof question.options]}
                              </span>
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleBackToQuizzes} variant="outline">
                  Back to Quizzes
                </Button>
                <Button onClick={() => handleStartQuiz(selectedQuiz!)} className="btn-hero">
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedQuiz) {
    const question = sampleQuestions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Header */}
          <Card className="study-card border-0 mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  Data Structures Fundamentals
                </h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">12:30 remaining</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Question {currentQuestion + 1} of {sampleQuestions.length}
                  </span>
                  <span className="text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="progress-glow" />
              </div>
            </CardContent>
          </Card>

          {/* Question */}
          <Card className="study-card border-0 mb-6">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {question.question}
              </h3>
              
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-4"
              >
                {Object.entries(question.options).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor={key} className="flex-1 cursor-pointer text-foreground">
                      <span className="font-medium mr-2">{key.toUpperCase()}.</span>
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNextQuestion}
              disabled={!answers[currentQuestion]}
              className="btn-hero"
            >
              {currentQuestion === sampleQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2 mb-2">
            <Brain className="w-8 h-8 text-primary" />
            Quizzes
          </h1>
          <p className="text-muted-foreground">Test your knowledge with adaptive quizzes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="study-card border-0">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">87%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>
          
          <Card className="study-card border-0">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">23</p>
              <p className="text-sm text-muted-foreground">Quizzes Completed</p>
            </CardContent>
          </Card>
          
          <Card className="study-card border-0">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-achievement mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">Perfect Scores</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Quizzes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableQuizzes.map((quiz) => (
            <Card key={quiz.id} className="study-card hover:card-hover border-0">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <Badge className={`text-xs ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Brain className="w-4 h-4" />
                    {quiz.questions} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {quiz.duration}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Topics covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {quiz.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {quiz.attempted && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Last attempt: <span className="text-foreground font-medium">
                          {quiz.lastScore}/{quiz.questions}
                        </span>
                      </p>
                    </div>
                  )}
                  
                  <Button
                    onClick={() => handleStartQuiz(quiz.id)}
                    className="w-full btn-hero"
                  >
                    {quiz.attempted ? "Retake Quiz" : "Start Quiz"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;