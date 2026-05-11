-- CreateTable
CREATE TABLE "campus_maps" (
    "id" TEXT NOT NULL,
    "imageData" TEXT NOT NULL,
    "imageName" TEXT,
    "imageSize" TEXT,
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campus_maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bin_statuses" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "fillStatus" TEXT NOT NULL DEFAULT 'empty',
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bin_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bin_statuses_locationId_key" ON "bin_statuses"("locationId");

-- CreateIndex
CREATE INDEX "bin_statuses_fillStatus_idx" ON "bin_statuses"("fillStatus");
