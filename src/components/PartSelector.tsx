import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, FileText, Clock, Users } from "lucide-react";
import { WritingPart } from "@/pages/Index";

interface PartSelectorProps {
  onPartSelect: (part: WritingPart) => void;
}

const PartSelector = ({ onPartSelect }: PartSelectorProps) => {
  const parts = [
    {
      id: "part1" as WritingPart,
      title: "Task 1",
      subtitle: "Academic Writing",
      description: "Describe, summarize or explain visual information in your own words",
      timeLimit: "20 minutes",
      wordCount: "150+ words",
      icon: BarChart3,
      examples: ["Charts & Graphs", "Tables", "Diagrams", "Maps"],
      color: "bg-blue-500",
    },
    {
      id: "part2" as WritingPart,
      title: "Task 2", 
      subtitle: "Essay Writing",
      description: "Present a written argument or case to an educated reader with no specialist knowledge",
      timeLimit: "40 minutes",
      wordCount: "250+ words", 
      icon: FileText,
      examples: ["Opinion Essays", "Discussion Essays", "Problem/Solution", "Advantages/Disadvantages"],
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
          IELTS Writing Practice
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose between Task 1 (Academic Writing) and Task 2 (Essay Writing) to start practicing 
          with authentic IELTS questions and receive detailed feedback.
        </p>
      </div>

      {/* Part Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {parts.map((part) => {
          const IconComponent = part.icon;
          return (
            <Card 
              key={part.id} 
              className="group hover:shadow-elegant transition-smooth cursor-pointer border-2 hover:border-primary/20"
              onClick={() => onPartSelect(part.id)}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 ${part.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth shadow-card`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {part.subtitle}
                  </Badge>
                </div>
                
                <div>
                  <CardTitle className="text-2xl mb-2">{part.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {part.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Requirements */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{part.timeLimit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{part.wordCount}</span>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <p className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Question Types:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {part.examples.map((example) => (
                      <Badge key={example} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full group-hover:gradient-primary transition-smooth" 
                  size="lg"
                >
                  Start {part.title} Practice
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-secondary/50 to-accent/10 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">!</span>
            </div>
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Task 1:</strong> Focus on accuracy and clear description of visual data. 
              Use varied vocabulary and avoid repetition.
            </div>
            <div>
              <strong>Task 2:</strong> Develop clear arguments with examples. Structure your essay 
              with introduction, body paragraphs, and conclusion.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartSelector;