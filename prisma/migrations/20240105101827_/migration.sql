-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stack" TEXT[],
    "github" TEXT,
    "website" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
