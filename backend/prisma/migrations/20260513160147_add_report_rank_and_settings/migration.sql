-- AlterTable
ALTER TABLE "reports" ADD COLUMN     "reportRank" INTEGER;

-- CreateIndex
CREATE INDEX "reports_locationId_type_status_idx" ON "reports"("locationId", "type", "status");
