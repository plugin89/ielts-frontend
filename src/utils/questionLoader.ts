import { Question } from "@/pages/Index";
import task1GeneralQuestions from "@/data/task1-general-questions.json";
import task1AcademicQuestions from "@/data/task1-academic-questions.json";
import task2Questions from "@/data/task2-questions.json";

export type QuestionCategory = "past" | "mock";

export interface QuestionsData {
  past: Question[];
  mock: Question[];
}

export const loadQuestions = (part: "part1_general" | "part1_academic" | "part2"): QuestionsData => {
  switch (part) {
    case "part1_general":
      return task1GeneralQuestions as QuestionsData;
    case "part1_academic":
      return task1AcademicQuestions as QuestionsData;
    case "part2":
      return task2Questions as QuestionsData;
    default:
      return { past: [], mock: [] };
  }
};
