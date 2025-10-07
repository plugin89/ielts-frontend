import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface EssayContentProps {
  essayContent: string;
  corrections?: CorrectionData[];
}

export interface CorrectionData {
  original: string;
  simplified: string;
  startIndex: number;
  endIndex: number;
}

// Mock function to generate random corrections from essay content
const generateMockCorrections = (content: string): CorrectionData[] => {
  const corrections: CorrectionData[] = [];

  // Common phrases to replace (mock data)
  const replacements = [
    { pattern: /in my opinion/gi, simplified: "I think" },
    { pattern: /a lot of/gi, simplified: "many" },
    { pattern: /because of the fact that/gi, simplified: "because" },
    { pattern: /in order to/gi, simplified: "to" },
    { pattern: /at this point in time/gi, simplified: "now" },
    { pattern: /due to the fact that/gi, simplified: "because" },
    { pattern: /for the purpose of/gi, simplified: "for" },
    { pattern: /in the event that/gi, simplified: "if" },
    { pattern: /with regard to/gi, simplified: "about" },
    { pattern: /take into consideration/gi, simplified: "consider" },
    { pattern: /make a decision/gi, simplified: "decide" },
    { pattern: /give consideration to/gi, simplified: "consider" },
    { pattern: /on a daily basis/gi, simplified: "daily" },
    { pattern: /in spite of/gi, simplified: "despite" },
    { pattern: /prior to/gi, simplified: "before" },
  ];

  replacements.forEach(({ pattern, simplified }) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      corrections.push({
        original: match[0],
        simplified: simplified,
        startIndex: match.index,
        endIndex: match.index + match[0].length,
      });
    }
  });

  // Sort by startIndex
  corrections.sort((a, b) => a.startIndex - b.startIndex);

  return corrections;
};

const EssayContent = ({ essayContent, corrections }: EssayContentProps) => {
  const { t } = useLanguage();
  const [showSimplified, setShowSimplified] = useState<{[key: number]: boolean}>({});
  const finalCorrections = corrections || generateMockCorrections(essayContent);

  const toggleCorrection = (index: number) => {
    setShowSimplified(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderContent = () => {
    if (finalCorrections.length === 0) {
      return <div className="whitespace-pre-wrap text-base leading-relaxed font-serif">{essayContent}</div>;
    }

    const segments = [];
    let lastIndex = 0;

    finalCorrections.forEach((correction, index) => {
      // Add text before correction
      if (correction.startIndex > lastIndex) {
        segments.push(
          <span key={`text-${index}`}>
            {essayContent.substring(lastIndex, correction.startIndex)}
          </span>
        );
      }

      // Add correction with toggle
      const displayText = showSimplified[index] ? correction.simplified : correction.original;
      segments.push(
        <button
          key={`correction-${index}`}
          onClick={() => toggleCorrection(index)}
          className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-medium transition-all cursor-pointer"
          title={`Click to toggle. Original: "${correction.original}" → Simplified: "${correction.simplified}"`}
        >
          {displayText}
        </button>
      );

      lastIndex = correction.endIndex;
    });

    // Add remaining text
    if (lastIndex < essayContent.length) {
      segments.push(
        <span key="text-end">
          {essayContent.substring(lastIndex)}
        </span>
      );
    }

    return <div className="whitespace-pre-wrap text-base leading-relaxed font-serif">{segments}</div>;
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="text-lg">{t('review.yourEssay')}</CardTitle>
        <CardDescription>
          {t('review.essayContentDesc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 p-6 rounded-lg max-h-96 overflow-y-auto">
          {renderContent()}
        </div>
        {finalCorrections.length > 0 && (
          <div className="mt-4 text-xs text-muted-foreground">
            {t(finalCorrections.length === 1 ? 'review.suggestionFound' : 'review.suggestionsFound', finalCorrections.length.toString())}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EssayContent;
