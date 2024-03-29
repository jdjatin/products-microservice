-- CreateTable
CREATE TABLE "product_category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);
