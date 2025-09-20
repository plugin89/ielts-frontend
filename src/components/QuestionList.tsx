import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, FileText, BarChart3, Users, Globe } from "lucide-react";
import { WritingPart, Question } from "@/pages/Index";

interface QuestionListProps {
  part: WritingPart;
  onQuestionSelect: (question: Question) => void;
  onBack: () => void;
}

const QuestionList = ({ part, onQuestionSelect, onBack }: QuestionListProps) => {
  const questions: Record<WritingPart, Question[]> = {
    part1: [
      {
        id: "p1-charts",
        title: "Sales Data Analysis",
        description: "The chart shows the sales figures for three different product categories over a 12-month period. Summarize the information by selecting and reporting the main features.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Bar Chart"
      },
      {
        id: "p1-process",
        title: "Coffee Production Process",
        description: "The diagram illustrates the process of coffee production from bean to cup. Describe the process shown in the diagram.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Process Diagram"
      },
      {
        id: "p1-table",
        title: "University Enrollment Statistics",
        description: "The table shows the number of students enrolled in different university programs between 2019 and 2023. Summarize the key trends.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Table"
      },
      {
        id: "p1-map",
        title: "Town Development Plans",
        description: "The maps show the changes planned for a town center. Compare the current layout with the proposed changes.",
        timeLimit: 20,
        wordLimit: 150,
        type: "Maps"
      }
    ],
    part2: [
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
      },
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

  const currentPartInfo = partInfo[part];
  const currentQuestions = questions[part];
  const IconComponent = currentPartInfo.icon;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack} className="shrink-0">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${currentPartInfo.color} rounded-lg flex items-center justify-center shadow-card`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{currentPartInfo.title}</h1>
            <p className="text-muted-foreground">{currentPartInfo.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
        <CardHeader>
          <CardTitle className="text-lg">Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span><strong>{currentQuestions[0]?.timeLimit} minutes</strong> time limit</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span><strong>{currentQuestions[0]?.wordLimit}+</strong> words minimum</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span><strong>Academic</strong> register</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {part === "part1" 
              ? "Choose a visual information task below. You'll need to describe, summarize or explain the information clearly and accurately."
              : "Select an essay topic below. Present a well-structured argument with clear examples and logical reasoning."
            }
          </p>
        </CardContent>
      </Card>

      {/* Questions Grid */}
      <div className="grid gap-4">
        {currentQuestions.map((question, index) => (
          <Card 
            key={question.id}
            className="group hover:shadow-elegant transition-smooth cursor-pointer border-2 hover:border-primary/20"
            onClick={() => onQuestionSelect(question)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs font-medium">
                      Question {index + 1}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {question.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                    {question.title}
                  </CardTitle>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0 ml-4">
                  <Clock className="w-4 h-4" />
                  <span>{question.timeLimit}min</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <CardDescription className="text-base leading-relaxed mb-4">
                {question.description}
              </CardDescription>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {question.wordLimit}+ words
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    Academic level
                  </span>
                </div>
                
                <Button 
                  size="sm" 
                  className="group-hover:gradient-primary transition-smooth"
                >
                  Start Writing
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {part === "part1" ? (
              <>
                <div>• Focus on the most important trends and patterns</div>
                <div>• Use appropriate vocabulary for describing data</div>
                <div>• Don't include personal opinions or speculation</div>
                <div>• Structure your response with clear paragraphs</div>
              </>
            ) : (
              <>
                <div>• Plan your essay structure before writing</div>
                <div>• Use clear topic sentences for each paragraph</div>
                <div>• Support your arguments with relevant examples</div>
                <div>• Write a strong conclusion that summarizes your position</div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionList;