import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileText, Clock, Target, CheckCircle, AlertTriangle, BookOpen, Lightbulb } from "lucide-react";
import { Question, Essay, EssayFeedback } from "@/pages/Index";

interface EssayReviewProps {
  essay: Essay;
  question: Question;
  feedback: EssayFeedback | null;
  onNewEssay: () => void;
  onBack: () => void;
}

// Mock AI feedback generator (fallback)
const generateMockFeedback = (essay: Essay, question: Question): EssayFeedback => {
  const feedback: EssayFeedback = {
    overallScore: Math.min(9, Math.max(5, 6 + Math.random() * 2)),
    scores: {
      taskResponse: Math.min(9, Math.max(5, 6 + Math.random() * 2)),
      coherenceCohesion: Math.min(9, Math.max(5, 6 + Math.random() * 2)),
      lexicalResource: Math.min(9, Math.max(5, 6 + Math.random() * 2)),
      grammaticalAccuracy: Math.min(9, Math.max(5, 6 + Math.random() * 2))
    },
    strengths: [
      "Clear structure with good paragraph organization",
      "Appropriate use of linking words and transitions",
      "Good range of vocabulary related to the topic",
      "Generally accurate grammar usage"
    ],
    improvements: [
      "Could benefit from more specific examples to support arguments",
      "Some sentences could be more concise and direct",
      "Consider using more sophisticated vocabulary where appropriate",
      "Minor grammatical errors that could be avoided with proofreading"
    ],
    suggestions: [
      "Practice writing topic sentences that clearly introduce main ideas",
      "Work on paraphrasing skills to avoid repetition",
      "Read more academic texts to improve vocabulary range",
      "Always leave time for proofreading and editing"
    ]
  };

  // Adjust scores based on actual essay metrics
  if (essay.wordCount < question.wordLimit * 0.8) {
    feedback.scores.taskResponse -= 1;
  }
  if (essay.wordCount > question.wordLimit * 2) {
    feedback.scores.taskResponse -= 0.5;
  }

  feedback.overallScore = Math.round(
    (feedback.scores.taskResponse + 
     feedback.scores.coherenceCohesion + 
     feedback.scores.lexicalResource + 
     feedback.scores.grammaticalAccuracy) / 4 * 10
  ) / 10;

  return feedback;
};

const EssayReview = ({ essay, question, feedback, onNewEssay, onBack }: EssayReviewProps) => {
  const finalFeedback = feedback || generateMockFeedback(essay, question);
  const timeSpentMinutes = Math.round(essay.timeSpent / 60);
  const isWithinTimeLimit = essay.timeSpent <= question.timeLimit * 60;

  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-success";
    if (score >= 6) return "text-warning";
    return "text-destructive";
  };

  const getScoreProgress = (score: number) => (score / 9) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Questions
          </Button>
          
          <Badge variant="secondary">
            {question.type}
          </Badge>
        </div>

        <Button onClick={onNewEssay} className="gradient-primary">
          Practice Another Question
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Essay Stats & Overall Score */}
        <div className="space-y-4">
          {/* Overall Score */}
          <Card className="text-center gradient-secondary border-accent/20">
            <CardHeader>
              <CardTitle className="text-white">Overall Band Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-2">
                {finalFeedback.overallScore}
              </div>
              <p className="text-white/80 text-sm">
                {finalFeedback.overallScore >= 7 ? "Good" : 
                 finalFeedback.overallScore >= 6 ? "Competent" : "Developing"}
              </p>
            </CardContent>
          </Card>

          {/* Essay Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Essay Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Word Count</p>
                  <p className={`font-semibold ${
                    essay.wordCount >= question.wordLimit ? 'text-success' : 'text-warning'
                  }`}>
                    {essay.wordCount}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time Spent</p>
                  <p className={`font-semibold ${
                    isWithinTimeLimit ? 'text-success' : 'text-warning'
                  }`}>
                    {timeSpentMinutes}m
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Target Words</p>
                  <p className="font-semibold">{question.wordLimit}+</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time Limit</p>
                  <p className="font-semibold">{question.timeLimit}m</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {essay.wordCount >= question.wordLimit ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-success">Word count requirement met</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-warning">Below minimum word count</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {isWithinTimeLimit ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-success">Completed within time limit</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-warning">Exceeded time limit</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Feedback */}
        <div className="lg:col-span-2 space-y-6">
          {/* Band Scores Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Band Score Breakdown
              </CardTitle>
              <CardDescription>
                IELTS Writing Task assessment criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(finalFeedback.scores).map(([criteria, score]) => {
                const criteriaNames = {
                  taskResponse: "Task Response",
                  coherenceCohesion: "Coherence & Cohesion", 
                  lexicalResource: "Lexical Resource",
                  grammaticalAccuracy: "Grammatical Accuracy"
                };
                
                return (
                  <div key={criteria} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{criteriaNames[criteria as keyof typeof criteriaNames]}</span>
                      <span className={`font-bold ${getScoreColor(score)}`}>
                        {score.toFixed(1)}
                      </span>
                    </div>
                    <Progress value={getScoreProgress(score)} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {finalFeedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-warning">
                <AlertTriangle className="w-5 h-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {finalFeedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Study Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <Lightbulb className="w-5 h-5" />
                Study Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {finalFeedback.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Your Essay */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Essay</CardTitle>
              <CardDescription>
                Review your response - {question.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {essay.content}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EssayReview;