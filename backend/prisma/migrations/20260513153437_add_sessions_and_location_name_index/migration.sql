/*
  Warnings:

  - The primary key for the `asset_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `asset_categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `bin_statuses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `bin_statuses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updatedBy` column on the `bin_statuses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `campus_maps` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `campus_maps` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uploadedById` column on the `campus_maps` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `campus_news` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `campus_news` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `publishedById` column on the `campus_news` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `item_presets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `item_presets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `locations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `locations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `reports` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `urgency` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `wasteType` on the `reports` table. All the data in the column will be lost.
  - The `id` column on the `reports` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `assignedStaffId` column on the `reports` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `system_settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `system_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updatedById` column on the `system_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `course` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `users` table. All the data in the column will be lost.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[lrn]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `locationId` on the `bin_statuses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `categoryId` on the `item_presets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `urgencyId` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `reports` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AssetAction" AS ENUM ('REPAIR', 'DISPOSE');

-- CreateEnum
CREATE TYPE "HistoryType" AS ENUM ('MONTHLY', 'QUARTERLY');

-- DropForeignKey
ALTER TABLE "campus_news" DROP CONSTRAINT "campus_news_publishedById_fkey";

-- DropForeignKey
ALTER TABLE "item_presets" DROP CONSTRAINT "item_presets_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_assignedStaffId_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_userId_fkey";

-- DropIndex
DROP INDEX "users_studentId_key";

-- AlterTable
ALTER TABLE "asset_categories" DROP CONSTRAINT "asset_categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "asset_categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "bin_statuses" DROP CONSTRAINT "bin_statuses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "locationId",
ADD COLUMN     "locationId" INTEGER NOT NULL,
DROP COLUMN "updatedBy",
ADD COLUMN     "updatedBy" INTEGER,
ADD CONSTRAINT "bin_statuses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "campus_maps" DROP CONSTRAINT "campus_maps_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "uploadedById",
ADD COLUMN     "uploadedById" INTEGER,
ADD CONSTRAINT "campus_maps_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "campus_news" DROP CONSTRAINT "campus_news_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "publishedById",
ADD COLUMN     "publishedById" INTEGER,
ADD CONSTRAINT "campus_news_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "item_presets" DROP CONSTRAINT "item_presets_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD CONSTRAINT "item_presets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "locations" DROP CONSTRAINT "locations_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "locations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "reports" DROP CONSTRAINT "reports_pkey",
DROP COLUMN "urgency",
DROP COLUMN "wasteType",
ADD COLUMN     "assetAction" "AssetAction",
ADD COLUMN     "assetCategoryId" INTEGER,
ADD COLUMN     "itemPresetId" INTEGER,
ADD COLUMN     "locationId" INTEGER,
ADD COLUMN     "urgencyId" INTEGER NOT NULL,
ADD COLUMN     "wasteTypeId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "assignedStaffId",
ADD COLUMN     "assignedStaffId" INTEGER,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "reports_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "system_settings" DROP CONSTRAINT "system_settings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "updatedById",
ADD COLUMN     "updatedById" INTEGER,
ADD CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "course",
DROP COLUMN "department",
DROP COLUMN "studentId",
ADD COLUMN     "eligibleForCertificate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastAwardedQuarter" INTEGER,
ADD COLUMN     "lastAwardedYear" INTEGER,
ADD COLUMN     "lifetimePoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lrn" TEXT,
ADD COLUMN     "quarterlyPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "yearLevel" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "point_history" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "type" "HistoryType" NOT NULL DEFAULT 'MONTHLY',
    "month" INTEGER,
    "quarter" INTEGER,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "point_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waste_types" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '♻️',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "waste_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "urgency_levels" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urgency_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "deviceName" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_conditions" (
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "point_history_userId_idx" ON "point_history"("userId");

-- CreateIndex
CREATE INDEX "point_history_month_year_idx" ON "point_history"("month", "year");

-- CreateIndex
CREATE INDEX "point_history_quarter_year_idx" ON "point_history"("quarter", "year");

-- CreateIndex
CREATE INDEX "point_history_type_idx" ON "point_history"("type");

-- CreateIndex
CREATE UNIQUE INDEX "waste_types_key_key" ON "waste_types"("key");

-- CreateIndex
CREATE INDEX "waste_types_enabled_sortOrder_idx" ON "waste_types"("enabled", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "urgency_levels_key_key" ON "urgency_levels"("key");

-- CreateIndex
CREATE INDEX "urgency_levels_enabled_sortOrder_idx" ON "urgency_levels"("enabled", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_tokenHash_key" ON "sessions"("tokenHash");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_expiresAt_idx" ON "sessions"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "asset_conditions_key_key" ON "asset_conditions"("key");

-- CreateIndex
CREATE INDEX "asset_conditions_enabled_sortOrder_idx" ON "asset_conditions"("enabled", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "bin_statuses_locationId_key" ON "bin_statuses"("locationId");

-- CreateIndex
CREATE INDEX "bin_statuses_updatedBy_idx" ON "bin_statuses"("updatedBy");

-- CreateIndex
CREATE INDEX "campus_maps_uploadedById_idx" ON "campus_maps"("uploadedById");

-- CreateIndex
CREATE INDEX "campus_news_publishedById_idx" ON "campus_news"("publishedById");

-- CreateIndex
CREATE INDEX "item_presets_categoryId_enabled_sortOrder_idx" ON "item_presets"("categoryId", "enabled", "sortOrder");

-- CreateIndex
CREATE INDEX "locations_name_idx" ON "locations"("name");

-- CreateIndex
CREATE INDEX "reports_userId_idx" ON "reports"("userId");

-- CreateIndex
CREATE INDEX "reports_assignedStaffId_idx" ON "reports"("assignedStaffId");

-- CreateIndex
CREATE INDEX "reports_locationId_idx" ON "reports"("locationId");

-- CreateIndex
CREATE INDEX "reports_urgencyId_idx" ON "reports"("urgencyId");

-- CreateIndex
CREATE INDEX "reports_wasteTypeId_idx" ON "reports"("wasteTypeId");

-- CreateIndex
CREATE INDEX "reports_assetCategoryId_idx" ON "reports"("assetCategoryId");

-- CreateIndex
CREATE INDEX "reports_itemPresetId_idx" ON "reports"("itemPresetId");

-- CreateIndex
CREATE INDEX "system_settings_updatedById_idx" ON "system_settings"("updatedById");

-- CreateIndex
CREATE UNIQUE INDEX "users_lrn_key" ON "users"("lrn");

-- AddForeignKey
ALTER TABLE "point_history" ADD CONSTRAINT "point_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_assignedStaffId_fkey" FOREIGN KEY ("assignedStaffId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_urgencyId_fkey" FOREIGN KEY ("urgencyId") REFERENCES "urgency_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_wasteTypeId_fkey" FOREIGN KEY ("wasteTypeId") REFERENCES "waste_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_assetCategoryId_fkey" FOREIGN KEY ("assetCategoryId") REFERENCES "asset_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_itemPresetId_fkey" FOREIGN KEY ("itemPresetId") REFERENCES "item_presets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus_news" ADD CONSTRAINT "campus_news_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_presets" ADD CONSTRAINT "item_presets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "asset_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus_maps" ADD CONSTRAINT "campus_maps_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin_statuses" ADD CONSTRAINT "bin_statuses_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bin_statuses" ADD CONSTRAINT "bin_statuses_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_settings" ADD CONSTRAINT "system_settings_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
