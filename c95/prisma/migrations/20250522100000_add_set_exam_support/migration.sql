-- AlterTable
ALTER TABLE "ExamAttempt" ADD COLUMN "questionSetId" TEXT;

-- AlterTable
ALTER TABLE "ExamAnswer" ADD COLUMN "sectionIdSnapshot" TEXT,
ADD COLUMN "sectionNameSnapshot" TEXT,
ADD COLUMN "sectionOrderSnapshot" INTEGER;

-- CreateIndex
CREATE INDEX "ExamAttempt_questionSetId_idx" ON "ExamAttempt"("questionSetId");

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_questionSetId_fkey" FOREIGN KEY ("questionSetId") REFERENCES "QuestionSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
