-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "document_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_document_number_key" ON "customers"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
