/*
  Warnings:

  - You are about to drop the column `permissionsPID` on the `Staff` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Staff` DROP FOREIGN KEY `Staff_permissionsPID_fkey`;

-- AlterTable
ALTER TABLE `Staff` DROP COLUMN `permissionsPID`;

-- AddForeignKey
ALTER TABLE `Permissions` ADD CONSTRAINT `Permissions_PID_fkey` FOREIGN KEY (`PID`) REFERENCES `Staff`(`PID`) ON DELETE RESTRICT ON UPDATE CASCADE;
