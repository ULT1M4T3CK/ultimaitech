-- CreateEnum
CREATE TYPE "GradingMode" AS ENUM ('AUTO', 'INSTRUCTOR');

-- CreateEnum
CREATE TYPE "LiveExamStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED');

-- AlterEnum: extend QuestionType (PostgreSQL: one value per statement)
ALTER TYPE "QuestionType" ADD VALUE 'IMAGE_CHOICE';
ALTER TYPE "QuestionType" ADD VALUE 'OPEN_ANSWER';
ALTER TYPE "QuestionType" ADD VALUE 'OBSERVATION_CHECKLIST';
ALTER TYPE "QuestionType" ADD VALUE 'PHYSICAL_INSPECTION';
ALTER TYPE "QuestionType" ADD VALUE 'SAFETY_OVERRIDE';

-- CreateTable Course
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- Default course for existing rows
INSERT INTO "Course" ("id", "name", "slug", "description", "order", "isActive")
VALUES ('cmigdefaultcourse', 'Default course', 'default', 'Migrated from legacy schema', 0, true);

-- Link MainTopic -> Course
ALTER TABLE "MainTopic" ADD COLUMN "courseId" TEXT;
UPDATE "MainTopic" SET "courseId" = 'cmigdefaultcourse';
ALTER TABLE "MainTopic" ALTER COLUMN "courseId" SET NOT NULL;
ALTER TABLE "MainTopic" ADD CONSTRAINT "MainTopic_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Rename MainTopic -> QuestionSet
ALTER TABLE "MainTopic" RENAME TO "QuestionSet";
ALTER TABLE "QuestionSet" RENAME COLUMN "passingSubTopicCount" TO "passingSectionCount";
ALTER TABLE "QuestionSet" RENAME CONSTRAINT "MainTopic_pkey" TO "QuestionSet_pkey";

CREATE INDEX "QuestionSet_courseId_idx" ON "QuestionSet"("courseId");
CREATE UNIQUE INDEX "QuestionSet_courseId_order_key" ON "QuestionSet"("courseId", "order");

-- SubTopic -> Section
ALTER TABLE "SubTopic" DROP CONSTRAINT "SubTopic_mainTopicId_fkey";
ALTER TABLE "SubTopic" RENAME TO "Section";
ALTER TABLE "Section" RENAME COLUMN "mainTopicId" TO "questionSetId";
ALTER TABLE "Section" ADD CONSTRAINT "Section_questionSetId_fkey" FOREIGN KEY ("questionSetId") REFERENCES "QuestionSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER INDEX "SubTopic_mainTopicId_order_key" RENAME TO "Section_questionSetId_order_key";

-- Question: subTopicId -> sectionId
ALTER TABLE "Question" DROP CONSTRAINT "Question_subTopicId_fkey";
ALTER TABLE "Question" RENAME COLUMN "subTopicId" TO "sectionId";
ALTER TABLE "Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER INDEX "Question_subTopicId_order_key" RENAME TO "Question_sectionId_order_key";

-- Question new columns
ALTER TABLE "Question" ADD COLUMN "gradingMode" "GradingMode" NOT NULL DEFAULT 'AUTO';
ALTER TABLE "Question" ADD COLUMN "feedback" TEXT;
ALTER TABLE "Question" ADD COLUMN "instructorNote" TEXT;
ALTER TABLE "Question" ADD COLUMN "canonicalAnswer" TEXT;
ALTER TABLE "Question" ADD COLUMN "scenarioId" TEXT;
ALTER TABLE "Question" ADD COLUMN "safetyCritical" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Question" ADD COLUMN "referenceMaterial" TEXT;

UPDATE "Question" SET "feedback" = "explanation" WHERE "explanation" IS NOT NULL;
ALTER TABLE "Question" DROP COLUMN "explanation";

-- AnswerOption imageUrl
ALTER TABLE "AnswerOption" ADD COLUMN "imageUrl" TEXT;

-- Scenario (after Section exists)
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Scenario_sectionId_idx" ON "Scenario"("sectionId");

ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Question" ADD CONSTRAINT "Question_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- QuestionImage
CREATE TABLE "QuestionImage" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QuestionImage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "QuestionImage_questionId_idx" ON "QuestionImage"("questionId");

ALTER TABLE "QuestionImage" ADD CONSTRAINT "QuestionImage_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Criterion
CREATE TABLE "Criterion" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Criterion_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Criterion_questionId_idx" ON "Criterion"("questionId");

ALTER TABLE "Criterion" ADD CONSTRAINT "Criterion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ExamAttempt
ALTER TABLE "ExamAttempt" DROP CONSTRAINT "ExamAttempt_subTopicId_fkey";
ALTER TABLE "ExamAttempt" RENAME COLUMN "subTopicName" TO "sectionName";
ALTER TABLE "ExamAttempt" RENAME COLUMN "mainTopicName" TO "questionSetName";
ALTER TABLE "ExamAttempt" RENAME COLUMN "subTopicId" TO "sectionId";

ALTER TABLE "ExamAttempt" ADD COLUMN "courseId" TEXT;
ALTER TABLE "ExamAttempt" ADD COLUMN "safetyFailed" BOOLEAN NOT NULL DEFAULT false;

UPDATE "ExamAttempt" ea
SET "courseId" = qs."courseId"
FROM "Section" s
JOIN "QuestionSet" qs ON s."questionSetId" = qs."id"
WHERE ea."sectionId" = s."id";

ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ExamAnswer
ALTER TABLE "ExamAnswer" ADD COLUMN "gradingMode" "GradingMode" NOT NULL DEFAULT 'AUTO';
ALTER TABLE "ExamAnswer" ADD COLUMN "feedbackSnapshot" TEXT;
ALTER TABLE "ExamAnswer" ADD COLUMN "safetyFailed" BOOLEAN NOT NULL DEFAULT false;

UPDATE "ExamAnswer" SET "feedbackSnapshot" = "explanation" WHERE "explanation" IS NOT NULL;
ALTER TABLE "ExamAnswer" DROP COLUMN "explanation";

-- LiveExamSession
CREATE TABLE "LiveExamSession" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "questionSetId" TEXT NOT NULL,
    "status" "LiveExamStatus" NOT NULL DEFAULT 'DRAFT',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "safetyFailed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LiveExamSession_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "LiveExamSession_studentId_idx" ON "LiveExamSession"("studentId");
CREATE INDEX "LiveExamSession_teacherId_idx" ON "LiveExamSession"("teacherId");
CREATE INDEX "LiveExamSession_courseId_idx" ON "LiveExamSession"("courseId");

ALTER TABLE "LiveExamSession" ADD CONSTRAINT "LiveExamSession_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LiveExamSession" ADD CONSTRAINT "LiveExamSession_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LiveExamSession" ADD CONSTRAINT "LiveExamSession_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LiveExamSession" ADD CONSTRAINT "LiveExamSession_questionSetId_fkey" FOREIGN KEY ("questionSetId") REFERENCES "QuestionSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- LiveExamGrade
CREATE TABLE "LiveExamGrade" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT,
    "sectionOrder" INTEGER NOT NULL,
    "questionOrder" INTEGER NOT NULL,
    "promptSnapshot" TEXT NOT NULL,
    "typeSnapshot" "QuestionType" NOT NULL,
    "gradingModeSnapshot" "GradingMode" NOT NULL,
    "optionsSnapshot" JSONB,
    "criteriaSnapshot" JSONB,
    "passed" BOOLEAN,
    "criteriaPassedIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "instructorNotes" TEXT,
    "safetyFailed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LiveExamGrade_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "LiveExamGrade_sessionId_idx" ON "LiveExamGrade"("sessionId");

ALTER TABLE "LiveExamGrade" ADD CONSTRAINT "LiveExamGrade_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "LiveExamSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LiveExamGrade" ADD CONSTRAINT "LiveExamGrade_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
