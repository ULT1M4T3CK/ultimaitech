-- Section: phase and code labels (missed in initial rename migration)
ALTER TABLE "Section" ADD COLUMN "phaseLabel" TEXT;
ALTER TABLE "Section" ADD COLUMN "code" TEXT;
