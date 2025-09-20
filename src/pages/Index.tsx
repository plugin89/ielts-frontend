import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PenTool, Clock, Target } from "lucide-react";
import { LoginButton } from "@/components/LoginButton";
import PartSelector from "@/components/PartSelector";
import QuestionList from "@/components/QuestionList";
import EssayWriter from "@/components/EssayWriter";
import EssayReview from "@/components/EssayReview";

export type WritingPart = "part1" | "part2";
export type AppState = "home" | "questions" | "writing" | "review";

export interface Question {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  wordLimit: number;
  type: string;
}

export interface Essay {
  questionId: string;
  content: string;
  wordCount: number;
  timeSpent: number;
}

export interface EssayFeedback {
  overallScore: number;
  scores: {
    taskResponse: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalAccuracy: number;
  };
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("home");
  const [selectedPart, setSelectedPart] = useState<WritingPart | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [currentEssay, setCurrentEssay] = useState<Essay | null>(null);
  const [currentFeedback, setCurrentFeedback] = useState<EssayFeedback | null>(null);

  const handlePartSelect = (part: WritingPart) => {
    setSelectedPart(part);
    setCurrentState("questions");
  };

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
    setCurrentState("writing");
  };

  const handleEssaySubmit = (essay: Essay, feedback?: EssayFeedback) => {
    setCurrentEssay(essay);
    setCurrentFeedback(feedback || null);
    setCurrentState("review");
  };

  const handleBackToHome = () => {
    setCurrentState("home");
    setSelectedPart(null);
    setSelectedQuestion(null);
    setCurrentEssay(null);
    setCurrentFeedback(null);
  };

  const handleBackToQuestions = () => {
    setCurrentState("questions");
    setSelectedQuestion(null);
    setCurrentEssay(null);
    setCurrentFeedback(null);
  };

  const handleNewEssay = () => {
    setCurrentState("questions");
    setSelectedQuestion(null);
    setCurrentEssay(null);
    setCurrentFeedback(null);
  };

  const renderContent = () => {
    switch (currentState) {
      case "home":
        return <PartSelector onPartSelect={handlePartSelect} />;
      case "questions":
        return (
          <QuestionList
            part={selectedPart!}
            onQuestionSelect={handleQuestionSelect}
            onBack={handleBackToHome}
          />
        );
      case "writing":
        return (
          <EssayWriter
            question={selectedQuestion!}
            onEssaySubmit={handleEssaySubmit}
            onBack={handleBackToQuestions}
          />
        );
      case "review":
        return (
          <EssayReview
            essay={currentEssay!}
            question={selectedQuestion!}
            feedback={currentFeedback}
            onNewEssay={handleNewEssay}
            onBack={handleBackToQuestions}
          />
        );
      default:
        return <PartSelector onPartSelect={handlePartSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer transition-smooth hover:opacity-80" 
              onClick={handleBackToHome}
            >
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-elegant">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">IELTS Writing Practice</h1>
                <p className="text-sm text-muted-foreground">Master your writing skills</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <BookOpen className="w-3 h-3 mr-1" />
                Academic Writing
              </Badge>
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Practice makes perfect. Keep writing to improve your IELTS score.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Timed Practice</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>AI Feedback</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;