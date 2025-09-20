import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, FileText, Play, Pause, Square, AlertCircle } from "lucide-react";
import { Question, Essay } from "@/pages/Index";

interface EssayWriterProps {
  question: Question;
  onEssaySubmit: (essay: Essay) => void;
  onBack: () => void;
}

const EssayWriter = ({ question, onEssaySubmit, onBack }: EssayWriterProps) => {
  const [content, setContent] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
  const isWordCountMet = wordCount >= question.wordLimit;
  const timeLimit = question.timeLimit * 60; // Convert to seconds
  const timeRemaining = timeLimit - timeElapsed;
  const isTimeUp = timeRemaining <= 0;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isTimeUp) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    const sign = seconds < 0 ? "-" : "";
    return `${sign}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsTimerRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsTimerRunning(false);
  };

  const handleStop = () => {
    setIsTimerRunning(false);
    setTimeElapsed(0);
    setHasStarted(false);
  };

  const handleSubmit = async () => {
    const essay: Essay = {
      questionId: question.id,
      content: content.trim(),
      wordCount,
      timeSpent: timeElapsed
    };
    
    try {
      const response = await fetch('https://ielts-backend-tl5u.onrender.com/write/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: essay.content,
          questionId: essay.questionId,
          wordCount: essay.wordCount,
          timeSpent: essay.timeSpent,
          questionType: question.type,
          wordLimit: question.wordLimit,
          timeLimit: question.timeLimit
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get essay review');
      }
      
      const feedback = await response.json();
      onEssaySubmit(essay, feedback);
    } catch (error) {
      console.error('Error submitting essay:', error);
      // Fall back to mock feedback for now
      onEssaySubmit(essay);
    }
  };

  const canSubmit = content.trim().length > 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Questions
        </Button>
        
        <Badge variant="secondary">
          {question.type}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Question Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">{question.title}</CardTitle>
              <CardDescription className="text-sm">
                Read the question carefully before starting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm leading-relaxed">{question.description}</p>
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Requirements:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{question.timeLimit} minutes maximum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>{question.wordLimit}+ words minimum</span>
                  </div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="space-y-3 pt-4 border-t">
                <div className="text-center">
                  <div className={`text-2xl font-mono font-bold ${
                    timeRemaining <= 300 && timeRemaining > 0 ? 'text-warning' : 
                    isTimeUp ? 'text-destructive' : 'text-primary'
                  }`}>
                    {formatTime(timeRemaining)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isTimeUp ? 'Time is up!' : 'Time remaining'}
                  </p>
                </div>

                <div className="flex gap-2">
                  {!hasStarted ? (
                    <Button onClick={handleStart} className="flex-1" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Start Timer
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={isTimerRunning ? handlePause : handleStart} 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                      >
                        {isTimerRunning ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </>
                        )}
                      </Button>
                      <Button onClick={handleStop} variant="outline" size="sm">
                        <Square className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Writing Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Status Bar */}
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="font-semibold">{wordCount}</span>
                    <span className="text-muted-foreground">/{question.wordLimit} words</span>
                  </div>
                  <div className={`text-sm ${
                    isWordCountMet ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {isWordCountMet ? '✓ Word count met' : `${question.wordLimit - wordCount} more needed`}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {isTimeUp && (
                    <div className="flex items-center gap-1 text-destructive text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Time exceeded
                    </div>
                  )}
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!canSubmit}
                    className="gradient-primary"
                  >
                    Submit Essay
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Writing Area */}
          <Card className="min-h-[600px]">
            <CardHeader>
              <CardTitle className="text-lg">Your Essay</CardTitle>
              <CardDescription>
                Write your response below. Focus on clear structure and relevant examples.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your essay here..."
                className="min-h-[500px] text-base leading-relaxed resize-none border-0 shadow-none focus-visible:ring-0 p-0"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Helpful Notes */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Writing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {question.type.includes("Essay") ? (
              <>
                <div>• Start with a clear introduction stating your position</div>
                <div>• Use topic sentences to begin each body paragraph</div>
                <div>• Support arguments with specific examples</div>
                <div>• Conclude by restating your main points</div>
              </>
            ) : (
              <>
                <div>• Begin with an overview of the main trends</div>
                <div>• Use appropriate vocabulary for describing data</div>
                <div>• Compare and contrast key features</div>
                <div>• Be accurate and avoid speculation</div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EssayWriter;