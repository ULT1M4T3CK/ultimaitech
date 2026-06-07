import type { GradingMode, QuestionType } from "@prisma/client";

/** Volledige score alleen als de geselecteerde set gelijk is aan de set juiste optie-id's. */
export function isAnswerCorrect(
  type: QuestionType,
  correctOptionIds: string[],
  selectedOptionIds: string[],
): boolean {
  void type;
  const a = [...correctOptionIds].sort().join("\0");
  const b = [...selectedOptionIds].sort().join("\0");
  return a === b;
}

export function correctOptionIdsFromOptions(options: { id: string; isCorrect: boolean }[]) {
  return options.filter((o) => o.isCorrect).map((o) => o.id);
}

export type SectionResultInput = {
  /** Minimum correct AUTO answers required to pass (when no safety failure). */
  passingQuestionCount: number;
  correctCount: number;
  totalCount: number;
  /** True if any safety-critical question was answered incorrectly. */
  safetyFailed: boolean;
};

/**
 * Uniforme haalregel voor zelfstudiepogingen (en compatibel met live-examensamenvattingen).
 * Veiligheidsfout always fails the section regardless of score.
 */
export function sectionResult(input: SectionResultInput): {
  passed: boolean;
  correctCount: number;
  totalCount: number;
  safetyFailed: boolean;
} {
  const { passingQuestionCount, correctCount, totalCount, safetyFailed } = input;
  const passed = !safetyFailed && correctCount >= passingQuestionCount && totalCount > 0;
  return { passed, correctCount, totalCount, safetyFailed };
}

/** Of dit vraagtype deelneemt aan de automatisch beoordeelde studenten-walkthrough. */
export function isAutoGradedWalkthroughType(type: QuestionType, gradingMode: GradingMode): boolean {
  return gradingMode === "AUTO" && type !== "OPEN_ANSWER" && type !== "OBSERVATION_CHECKLIST" && type !== "PHYSICAL_INSPECTION" && type !== "SAFETY_OVERRIDE";
}
