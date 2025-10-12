import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, BarChart3, Plus } from "lucide-react";
import { WritingPart, Question } from "@/pages/Index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Textarea } from "@/components/ui/textarea";
import { loadQuestions } from "@/utils/questionLoader";

interface QuestionListProps {
  part: WritingPart;
  onQuestionSelect: (question: Question) => void;
  onPartSelect: (part: WritingPart) => void;
}

const QuestionList = ({ part, onQuestionSelect, onPartSelect }: QuestionListProps) => {
  const { t } = useLanguage();
  const [task1GeneralType, setTask1GeneralType] = useState<"past" | "mock">("past");
  const [task1AcademicType, setTask1AcademicType] = useState<"past" | "mock">("past");
  const [task2QuestionType, setTask2QuestionType] = useState<"past" | "mock">("past");

  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customDescription, setCustomDescription] = useState("");
  const [customQuestions, setCustomQuestions] = useState<Record<string, Question[]>>({
    part1_general: [],
    part1_academic: [],
    part2: []
  });

  // Load questions from JSON files based on the selected part
  const questions = useMemo(() => {
    const data = loadQuestions(part);
    return {
      [`${part}_past`]: data.past,
      [`${part}_mock`]: data.mock
    };
  }, [part]);

  const partInfo = {
    part1: {
      title: "Task 1 - Academic Writing",
      subtitle: "Visual Information Description",
      icon: BarChart3,
      color: "bg-blue-500"
    },
    part2: {
      title: "Task 2 - Essay Writing", 
      subtitle: "Argumentative Essays",
      icon: FileText,
      color: "bg-purple-500"
    }
  };

  const handleStartWriting = () => {
    if (!customDescription.trim()) return;

    const partKey = part === "part1_general" ? "part1_general" : part === "part1_academic" ? "part1_academic" : "part2";
    const newQuestion: Question = {
      id: `custom-${Date.now()}`,
      title: "Custom Question",
      description: customDescription,
      timeLimit: part === "part2" ? 40 : 20,
      wordLimit: part === "part2" ? 250 : 150,
      type: "Custom"
    };

    setCustomDescription("");
    setShowCustomInput(false);
    onQuestionSelect(newQuestion);
  };

  const renderQuestionList = (questionList: Question[], showAddButton: boolean = false) => {
    return (
      <div className="grid gap-3">
        {questionList.map((question, index) => (
          <Card
            key={question.id}
            className="group hover:shadow-lg transition-all cursor-pointer border hover:border-primary/50"
            onClick={() => onQuestionSelect(question)}
          >
            <CardContent className="p-4">
              <CardDescription className="text-sm leading-relaxed text-foreground">
                {question.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
        {showAddButton && !showCustomInput && (
          <Card
            className="border-2 border-dashed hover:border-primary/50 cursor-pointer transition-all"
            onClick={() => setShowCustomInput(true)}
          >
            <CardContent className="p-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-primary">
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Add Custom Question</span>
            </CardContent>
          </Card>
        )}
        {showAddButton && showCustomInput && (
          <Card className="border-2 border-primary">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Custom Question</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomDescription("");
                  }}
                >
                  Cancel
                </Button>
              </div>
              <Textarea
                placeholder="Paste or type your question here..."
                className="min-h-[120px]"
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                autoFocus
              />
              <Button
                onClick={handleStartWriting}
                disabled={!customDescription.trim()}
                className="w-full"
              >
                Start Writing
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('home.title')}</h1>
        <p className="text-muted-foreground">{t('home.subtitle')}</p>
      </div>

      {/* Task Selection Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Task 1 (G) Card */}
        <Card
          className={`cursor-pointer transition-all ${
            part === "part1_general" ? "border-primary border-2 shadow-lg" : "border-2 hover:border-primary/50"
          }`}
          onClick={() => onPartSelect("part1_general")}
        >
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-3">
              <FileText className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t('task.1g.title')}</CardTitle>
            <CardDescription className="text-base">{t('task.1g.desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>• {t('task.minWords', '150')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>• {t('task.timeRecommended', '20')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>• {t('task.score', '33')}</span>
            </div>
          </CardContent>
        </Card>

        {/* Task 1 (A) Card */}
        <Card
          className={`cursor-pointer transition-all ${
            part === "part1_academic" ? "border-primary border-2 shadow-lg" : "border-2 hover:border-primary/50"
          }`}
          onClick={() => onPartSelect("part1_academic")}
        >
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-3">
              <BarChart3 className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t('task.1a.title')}</CardTitle>
            <CardDescription className="text-base">{t('task.1a.desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>• {t('task.minWords', '150')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>• {t('task.timeRecommended', '20')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>• {t('task.score', '33')}</span>
            </div>
          </CardContent>
        </Card>

        {/* Task 2 Card */}
        <Card
          className={`cursor-pointer transition-all ${
            part === "part2" ? "border-primary border-2 shadow-lg" : "border-2 hover:border-primary/50"
          }`}
          onClick={() => onPartSelect("part2")}
        >
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-3">
              <FileText className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t('task.2.title')}</CardTitle>
            <CardDescription className="text-base">{t('task.2.desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>• {t('task.minWords', '250')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>• {t('task.timeRecommended', '40')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>• {t('task.score', '67')}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Question Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('questions.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          {part === "part1_general" ? (
            <Tabs value={task1GeneralType} onValueChange={(value) => setTask1GeneralType(value as "past" | "mock")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="past">{t('questions.past')}</TabsTrigger>
                <TabsTrigger value="mock">{t('questions.mock')}</TabsTrigger>
              </TabsList>
              <TabsContent value="past">
                {renderQuestionList(questions[`${part}_past`], true)}
              </TabsContent>
              <TabsContent value="mock">
                {renderQuestionList(questions[`${part}_mock`], true)}
              </TabsContent>
            </Tabs>
          ) : part === "part1_academic" ? (
            <Tabs value={task1AcademicType} onValueChange={(value) => setTask1AcademicType(value as "past" | "mock")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="past">{t('questions.past')}</TabsTrigger>
                <TabsTrigger value="mock">{t('questions.mock')}</TabsTrigger>
              </TabsList>
              <TabsContent value="past">
                {renderQuestionList(questions[`${part}_past`], true)}
              </TabsContent>
              <TabsContent value="mock">
                {renderQuestionList(questions[`${part}_mock`], true)}
              </TabsContent>
            </Tabs>
          ) : (
            <Tabs value={task2QuestionType} onValueChange={(value) => setTask2QuestionType(value as "past" | "mock")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="past">{t('questions.past')}</TabsTrigger>
                <TabsTrigger value="mock">{t('questions.mock')}</TabsTrigger>
              </TabsList>
              <TabsContent value="past">
                {renderQuestionList(questions[`${part}_past`], true)}
              </TabsContent>
              <TabsContent value="mock">
                {renderQuestionList(questions[`${part}_mock`], true)}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionList;