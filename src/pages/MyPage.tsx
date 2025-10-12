import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LoginButton } from "@/components/LoginButton";
import { LanguageSelector } from "@/components/LanguageSelector";
import { PenTool, ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MyPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const [targetBandScore, setTargetBandScore] = useState(5.0);
  const [moduleType, setModuleType] = useState("General module");
  const [taskType, setTaskType] = useState<"task1" | "task2">("task1");

  // Mock data - replace with actual data from API
  const recentScores = [
    { task: "General 1", score: 4.5, topic: "topic bla bla" },
    { task: "2", score: 4.5, topic: "topic bla bla" },
    { task: "Academic 1", score: 4.5, topic: "topic bla bla" },
    { task: "2", score: 4.5, topic: "topic bla bla" },
  ];

  const practiceHistory = [
    { date: "Oct 11, 2025", score: 4.5, topic: "topic bla bla" },
    { date: "Oct 10, 2025", score: 4.5, topic: "topic bla bla" },
    { date: "Oct 1, 2025", score: 4.5, topic: "topic bla bla" },
    { date: "Oct 1, 2025", score: 4.5, topic: "topic bla bla" },
    { date: "Sep 29, 2025", score: 5.0, topic: "topic bla bla" },
  ];

  const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="transition-smooth hover:bg-accent/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div
                className="flex items-center gap-3 cursor-pointer transition-smooth hover:opacity-80"
                onClick={() => navigate("/")}
              >
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-elegant">
                  <PenTool className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{t('header.title')}</h1>
                  <p className="text-sm text-muted-foreground">{t('header.subtitle')}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSelector />
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Greeting */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Hi {userName}!</h2>
          </div>

          {/* Top Section: Target Band Score & Recent Scores */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Target Band Score */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Target band score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-8 border-primary/20 flex items-center justify-center">
                    <div className="text-center">
                      <Badge variant="outline" className="mb-2">
                        {moduleType}
                      </Badge>
                      <div className="text-5xl font-bold">{targetBandScore.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update target score
                </Button>
              </CardContent>
            </Card>

            {/* Recent Essay Practice Score */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Recent Essay Practice Score</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-muted font-semibold">Task</TableHead>
                      <TableHead className="bg-muted font-semibold">Score</TableHead>
                      <TableHead className="bg-muted font-semibold">Topic</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentScores.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.task}</TableCell>
                        <TableCell>{item.score}</TableCell>
                        <TableCell>{item.topic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Practice History Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Task Type Tabs */}
                <Tabs value={taskType} onValueChange={(value) => setTaskType(value as "task1" | "task2")}>
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="task1">Task 1 (Short writing)</TabsTrigger>
                    <TabsTrigger value="task2">Task 2 (Essay)</TabsTrigger>
                  </TabsList>

                  <TabsContent value={taskType} className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="bg-muted font-semibold">Date completed</TableHead>
                          <TableHead className="bg-muted font-semibold">Score</TableHead>
                          <TableHead className="bg-muted font-semibold">Topic</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {practiceHistory.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.date}</TableCell>
                            <TableCell>{item.score}</TableCell>
                            <TableCell>{item.topic}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
