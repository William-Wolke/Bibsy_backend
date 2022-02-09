/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Administrator` (
    `PID` VARCHAR(191) NOT NULL,
    `AccessToLibrary` BOOLEAN NOT NULL DEFAULT false,
    `AccessToResturant` BOOLEAN NOT NULL DEFAULT false,
    `AccessToUser` BOOLEAN NOT NULL DEFAULT false,
    `AccessToServer` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Administrator_PID_key`(`PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `PID` VARCHAR(191) NOT NULL,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,
    `isTeacher` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Staff_PID_key`(`PID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Administrator` ADD CONSTRAINT `Administrator_PID_fkey` FOREIGN KEY (`PID`) REFERENCES `Staff`(`PID`) ON DELETE RESTRICT ON UPDATE CASCADE;
