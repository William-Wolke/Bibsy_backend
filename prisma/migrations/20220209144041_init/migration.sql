/*
  Warnings:

  - A unique constraint covering the columns `[BookName]` on the table `Library` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PhoneNumber]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Library_BookName_key` ON `Library`(`BookName`);

-- CreateIndex
CREATE UNIQUE INDEX `Staff_Email_key` ON `Staff`(`Email`);

-- CreateIndex
CREATE UNIQUE INDEX `Staff_PhoneNumber_key` ON `Staff`(`PhoneNumber`);
