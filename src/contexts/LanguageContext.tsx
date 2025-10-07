import React, { createContext, useContext, useState } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ko: {
    // Header
    'header.title': 'IELTS Writing Practice',
    'header.subtitle': '라이팅 실력 향상을 위한 연습',
    'header.academic': 'Academic Writing',

    // Home Page
    'home.title': 'IELTS Writing Review',
    'home.subtitle': 'AI 기반 IELTS 라이팅 에세이 평가 시스템',

    // Task Cards
    'task.1g.title': 'Task 1 (G)',
    'task.1g.desc': '편지 작성 (General)',
    'task.1a.title': 'Task 1 (A)',
    'task.1a.desc': '차트, 그래프, 표 또는 다이어그램 설명',
    'task.2.title': 'Task 2 (All)',
    'task.2.desc': '주어진 주제에 대한 에세이 작성',
    'task.minWords': '최소 {0}단어',
    'task.timeRecommended': '{0}분 권장',
    'task.score': '점수 {0}%',

    // Question Selection
    'questions.title': '문제 선택',
    'questions.past': '기출문제',
    'questions.mock': '모의문제',

    // Writing Page
    'writing.backToQuestions': 'Back to Questions',
    'writing.requirements': 'Requirements:',
    'writing.timeLimit': '{0} minutes maximum',
    'writing.wordLimit': '{0}+ words minimum',
    'writing.timeRemaining': 'Time remaining',
    'writing.timeUp': 'Time is up!',
    'writing.startTimer': 'Start Timer',
    'writing.pause': 'Pause',
    'writing.resume': 'Resume',
    'writing.yourEssay': 'Your Essay',
    'writing.placeholder': 'Start writing your essay here...',
    'writing.writeResponse': 'Write your response below. Focus on clear structure and relevant examples.',
    'writing.wordCount': '{0}/{1} words',
    'writing.wordCountMet': '✓ Word count met',
    'writing.moreNeeded': '{0} more needed',
    'writing.timeExceeded': 'Time exceeded',
    'writing.submitEssay': 'Submit Essay',
    'writing.tips': 'Writing Tips',

    // Footer
    'footer.practice': 'Practice makes perfect. Keep writing to improve your IELTS score.',
    'footer.timedPractice': 'Timed Practice',
    'footer.aiFeedback': 'AI Feedback',

    // Review Page
    'review.backToQuestions': '문제로 돌아가기',
    'review.practiceAnother': '다른 문제 연습하기',
    'review.overallBandScore': '전체 밴드 점수',
    'review.good': '우수',
    'review.competent': '양호',
    'review.developing': '개선 필요',
    'review.essayStatistics': '에세이 통계',
    'review.wordCount': '단어 수',
    'review.timeSpent': '소요 시간',
    'review.targetWords': '목표 단어 수',
    'review.timeLimit': '제한 시간',
    'review.wordCountMet': '단어 수 요구사항 충족',
    'review.belowMinimum': '최소 단어 수 미달',
    'review.withinTimeLimit': '제한 시간 내 완료',
    'review.exceededTimeLimit': '제한 시간 초과',
    'review.bandScoreBreakdown': '밴드 점수 세부 분석',
    'review.ieltsWritingCriteria': 'IELTS Writing Task 평가 기준',
    'review.taskResponse': 'Task Response',
    'review.coherenceCohesion': 'Coherence & Cohesion',
    'review.lexicalResource': 'Lexical Resource',
    'review.grammaticalAccuracy': 'Grammatical Accuracy',
    'review.strengths': '강점',
    'review.improvements': '개선이 필요한 부분',
    'review.suggestions': '학습 제안',
    'review.yourEssay': '내 에세이',
    'review.reviewYourResponse': '답변 검토 - {0}',
    'review.essayContentDesc': '레벨보다 높은 단어는 간단한 동의어로 대체됩니다. 문장을 클릭하면 원문과 수정된 버전을 전환할 수 있습니다.',
    'review.suggestionsFound': '{0}개의 개선 제안을 찾았습니다',
    'review.suggestionFound': '{0}개의 개선 제안을 찾았습니다',
  },
  en: {
    // Header
    'header.title': 'IELTS Writing Practice',
    'header.subtitle': 'Master your writing skills',
    'header.academic': 'Academic Writing',

    // Home Page
    'home.title': 'IELTS Writing Review',
    'home.subtitle': 'AI-powered IELTS Writing Essay Evaluation System',

    // Task Cards
    'task.1g.title': 'Task 1 (G)',
    'task.1g.desc': 'Letter Writing (General)',
    'task.1a.title': 'Task 1 (A)',
    'task.1a.desc': 'Charts, Graphs, Tables or Diagrams Description',
    'task.2.title': 'Task 2 (All)',
    'task.2.desc': 'Essay Writing on Given Topic',
    'task.minWords': 'Min {0} words',
    'task.timeRecommended': '{0} min recommended',
    'task.score': 'Score {0}%',

    // Question Selection
    'questions.title': 'Question Selection',
    'questions.past': 'Past Papers',
    'questions.mock': 'Mock Tests',

    // Writing Page
    'writing.backToQuestions': 'Back to Questions',
    'writing.requirements': 'Requirements:',
    'writing.timeLimit': '{0} minutes maximum',
    'writing.wordLimit': '{0}+ words minimum',
    'writing.timeRemaining': 'Time remaining',
    'writing.timeUp': 'Time is up!',
    'writing.startTimer': 'Start Timer',
    'writing.pause': 'Pause',
    'writing.resume': 'Resume',
    'writing.yourEssay': 'Your Essay',
    'writing.placeholder': 'Start writing your essay here...',
    'writing.writeResponse': 'Write your response below. Focus on clear structure and relevant examples.',
    'writing.wordCount': '{0}/{1} words',
    'writing.wordCountMet': '✓ Word count met',
    'writing.moreNeeded': '{0} more needed',
    'writing.timeExceeded': 'Time exceeded',
    'writing.submitEssay': 'Submit Essay',
    'writing.tips': 'Writing Tips',

    // Footer
    'footer.practice': 'Practice makes perfect. Keep writing to improve your IELTS score.',
    'footer.timedPractice': 'Timed Practice',
    'footer.aiFeedback': 'AI Feedback',

    // Review Page
    'review.backToQuestions': 'Back to Questions',
    'review.practiceAnother': 'Practice Another Question',
    'review.overallBandScore': 'Overall Band Score',
    'review.good': 'Good',
    'review.competent': 'Competent',
    'review.developing': 'Developing',
    'review.essayStatistics': 'Essay Statistics',
    'review.wordCount': 'Word Count',
    'review.timeSpent': 'Time Spent',
    'review.targetWords': 'Target Words',
    'review.timeLimit': 'Time Limit',
    'review.wordCountMet': 'Word count requirement met',
    'review.belowMinimum': 'Below minimum word count',
    'review.withinTimeLimit': 'Completed within time limit',
    'review.exceededTimeLimit': 'Exceeded time limit',
    'review.bandScoreBreakdown': 'Band Score Breakdown',
    'review.ieltsWritingCriteria': 'IELTS Writing Task assessment criteria',
    'review.taskResponse': 'Task Response',
    'review.coherenceCohesion': 'Coherence & Cohesion',
    'review.lexicalResource': 'Lexical Resource',
    'review.grammaticalAccuracy': 'Grammatical Accuracy',
    'review.strengths': 'Strengths',
    'review.improvements': 'Areas for Improvement',
    'review.suggestions': 'Study Suggestions',
    'review.yourEssay': 'Your Essay',
    'review.reviewYourResponse': 'Review your response - {0}',
    'review.essayContentDesc': 'Words above your level are replaced with simpler synonyms. Click any sentence to toggle between original and rephrased versions.',
    'review.suggestionsFound': 'Found {0} suggestions for simplification',
    'review.suggestionFound': 'Found {0} suggestion for simplification',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string, ...args: string[]): string => {
    let translation = translations[language][key as keyof typeof translations['ko']] || key;

    // Replace placeholders {0}, {1}, etc. with provided arguments
    args.forEach((arg, index) => {
      translation = translation.replace(`{${index}}`, arg);
    });

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
