-- CreateTable
CREATE TABLE "item_presets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '📦',
    "categoryId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_presets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "item_presets_categoryId_enabled_sortOrder_idx" ON "item_presets"("categoryId", "enabled", "sortOrder");

-- AddForeignKey
ALTER TABLE "item_presets" ADD CONSTRAINT "item_presets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "asset_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
