import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, BarChart3 } from "lucide-react";
import { WritingPart, Question } from "@/pages/Index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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

  const questions = {
    part1_general_past: [
      {
        id: "p1g-letter1",
        title: "Complaint Letter",
        description: "You recently purchased a product online, but it arrived damaged. Write a letter to the company complaining about the issue and requesting a replacement or refund.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Formal Letter"
      },
      {
        id: "p1g-letter2",
        title: "Request Letter",
        description: "You are planning to visit a friend in another country. Write a letter to your friend requesting information about the best time to visit and asking for suggestions on places to see.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Informal Letter"
      }
    ],
    part1_general_mock: [
      {
        id: "p1g-letter3",
        title: "Invitation Letter",
        description: "You are organizing a surprise birthday party for a colleague. Write a letter to other colleagues inviting them to the party and providing details about the event.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Semi-formal Letter"
      },
      {
        id: "p1g-letter4",
        title: "Apology Letter",
        description: "You borrowed a book from a friend but accidentally damaged it. Write a letter apologizing for the damage and offering to replace or repair the book.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Informal Letter"
      }
    ],
    part1_academic_past: [
      {
        id: "p1a-charts",
        title: "Sales Data Analysis",
        description: "The chart shows the sales figures for three different product categories over a 12-month period. Summarize the information by selecting and reporting the main features.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Bar Chart"
      },
      {
        id: "p1a-process",
        title: "Coffee Production Process",
        description: "The diagram illustrates the process of coffee production from bean to cup. Describe the process shown in the diagram.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Process Diagram"
      }
    ],
    part1_academic_mock: [
      {
        id: "p1a-table",
        title: "University Enrollment Statistics",
        description: "The table shows the number of students enrolled in different university programs between 2019 and 2023. Summarize the key trends.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Table"
      },
      {
        id: "p1a-map",
        title: "Town Development Plans",
        description: "The maps show the changes planned for a town center. Compare the current layout with the proposed changes.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Maps"
      }
    ],
    part2_past: [
      {
        id: "p2-opinion",
        title: "Technology and Education",
        description: "Some people believe that technology has made learning easier and more effective. Others argue that traditional teaching methods are still the best. Discuss both views and give your own opinion.",
        timeLimit: 40,
        wordLimit: 250,
        type: "Opinion Essay"
      },
      {
        id: "p2-problem",
        title: "Urban Traffic Solutions",
        description: "Traffic congestion in cities is becoming a major problem. What are the causes of this issue and what solutions can you suggest?",
        timeLimit: 40,
        wordLimit: 250,
        type: "Problem/Solution"
      }
    ],
    part2_mock: [
      {
        id: "p2-advantages",
        title: "Working from Home",
        description: "More and more people are working from home rather than in offices. What are the advantages and disadvantages of this trend?",
        timeLimit: 40,
        wordLimit: 250,
        type: "Advantages/Disadvantages"
      },
      {
        id: "p2-discussion",
        title: "Environmental Protection vs Economic Growth",
        description: "Some people think environmental protection should be the priority, while others believe economic development is more important. Discuss both sides and give your opinion.",
        timeLimit: 40,
        wordLimit: 250,
        type: "Discussion"
      }
    ]
  };

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

  const renderQuestionList = (questionList: Question[]) => {
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
                {renderQuestionList(questions.part1_general_past)}
              </TabsContent>
              <TabsContent value="mock">
                {renderQuestionList(questions.part1_general_mock)}
              </TabsContent>
            </Tabs>
          ) : part === "part1_academic" ? (
            <Tabs value={task1AcademicType} onValueChange={(value) => setTask1AcademicType(value as "past" | "mock")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="past">{t('questions.past')}</TabsTrigger>
                <TabsTrigger value="mock">{t('questions.mock')}</TabsTrigger>
              </TabsList>
              <TabsContent value="past">
                {renderQuestionList(questions.part1_academic_past)}
              </TabsContent>
              <TabsContent value="mock">
                {renderQuestionList(questions.part1_academic_mock)}
              </TabsContent>
            </Tabs>
          ) : (
            <Tabs value={task2QuestionType} onValueChange={(value) => setTask2QuestionType(value as "past" | "mock")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="past">{t('questions.past')}</TabsTrigger>
                <TabsTrigger value="mock">{t('questions.mock')}</TabsTrigger>
              </TabsList>
              <TabsContent value="past">
                {renderQuestionList(questions.part2_past)}
              </TabsContent>
              <TabsContent value="mock">
                {renderQuestionList(questions.part2_mock)}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionList;