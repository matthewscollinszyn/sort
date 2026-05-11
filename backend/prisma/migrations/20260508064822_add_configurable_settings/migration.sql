-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN', 'MRF');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'VERIFIED', 'DISMISSED', 'DISPATCHED', 'IN_PROGRESS', 'COMPLETED', 'COLLECTED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('WASTE', 'ASSET');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('BIN_LOCATION', 'ROOM_LOCATION');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "studentId" TEXT,
    "course" TEXT,
    "section" TEXT,
    "department" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "reports" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT,
    "photoUrl" TEXT,
    "urgency" TEXT NOT NULL DEFAULT 'normal',
    "wasteType" TEXT NOT NULL DEFAULT 'general',
    "type" "ReportType" NOT NULL DEFAULT 'WASTE',
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "assignedStaffId" TEXT,
    "kilosCollected" DOUBLE PRECISION,
    "collectionDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campus_news" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "publishedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campus_news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LocationType" NOT NULL,
    "building" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "mapX" DOUBLE PRECISION,
    "mapY" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_studentId_key" ON "users"("studentId");

-- CreateIndex
CREATE INDEX "reports_userId_idx" ON "reports"("userId");

-- CreateIndex
CREATE INDEX "reports_status_idx" ON "reports"("status");

-- CreateIndex
CREATE INDEX "reports_assignedStaffId_idx" ON "reports"("assignedStaffId");

-- CreateIndex
CREATE INDEX "reports_type_status_idx" ON "reports"("type", "status");

-- CreateIndex
CREATE INDEX "campus_news_createdAt_idx" ON "campus_news"("createdAt");

-- CreateIndex
CREATE INDEX "campus_news_publishedById_idx" ON "campus_news"("publishedById");

-- CreateIndex
CREATE UNIQUE INDEX "asset_categories_name_key" ON "asset_categories"("name");

-- CreateIndex
CREATE INDEX "asset_categories_enabled_sortOrder_idx" ON "asset_categories"("enabled", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "locations_code_key" ON "locations"("code");

-- CreateIndex
CREATE INDEX "locations_type_enabled_sortOrder_idx" ON "locations"("type", "enabled", "sortOrder");

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_assignedStaffId_fkey" FOREIGN KEY ("assignedStaffId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus_news" ADD CONSTRAINT "campus_news_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
