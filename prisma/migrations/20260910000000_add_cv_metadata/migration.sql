-- CreateTable
CREATE TABLE "CvMetadata" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "viewUrl" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CvMetadata_pkey" PRIMARY KEY ("id")
);
