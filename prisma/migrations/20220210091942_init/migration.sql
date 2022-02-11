/*
  Warnings:

  - You are about to drop the `Administrators` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Administrators` DROP FOREIGN KEY `Administrators_PID_fkey`;

-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `permissionsPID` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Administrators`;

-- CreateTable
CREATE TABLE `Permissions` (
    `PID` VARCHAR(191) NOT NULL,
    `AccessToLibrary` BOOLEAN NOT NULL DEFAULT false,
    `AccessToResturant` BOOLEAN NOT NULL DEFAULT false,
    `AccessToUser` BOOLEAN NOT NULL DEFAULT false,
    `AccessToServer` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Permissions_PID_key`(`PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_permissionsPID_fkey` FOREIGN KEY (`permissionsPID`) REFERENCES `Permissions`(`PID`) ON DELETE SET NULL ON UPDATE CASCADE;
