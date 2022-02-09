/*
  Warnings:

  - You are about to drop the column `isTeacher` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the `Administrator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Administrator` DROP FOREIGN KEY `Administrator_PID_fkey`;

-- AlterTable
ALTER TABLE `Staff` DROP COLUMN `isTeacher`,
    ADD COLUMN `isPersonal` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `Administrator`;

-- CreateTable
CREATE TABLE `Administrators` (
    `PID` VARCHAR(191) NOT NULL,
    `AccessToLibrary` BOOLEAN NOT NULL DEFAULT false,
    `AccessToResturant` BOOLEAN NOT NULL DEFAULT false,
    `AccessToUser` BOOLEAN NOT NULL DEFAULT false,
    `AccessToServer` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Administrators_PID_key`(`PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Students` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `PID` VARCHAR(191) NOT NULL,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Students_PID_key`(`PID`),
    UNIQUE INDEX `Students_Email_key`(`Email`),
    UNIQUE INDEX `Students_PhoneNumber_key`(`PhoneNumber`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Library` (
    `ISBN` INTEGER NOT NULL,
    `BookName` VARCHAR(191) NOT NULL,
    `Author` VARCHAR(191) NOT NULL,
    `IsAvailable` BOOLEAN NOT NULL,
    `Quantity` INTEGER NOT NULL,

    UNIQUE INDEX `Library_ISBN_key`(`ISBN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BorrowDetails` (
    `ISBN` INTEGER NOT NULL,
    `Staff` VARCHAR(191) NOT NULL,
    `Student` VARCHAR(191) NOT NULL,
    `BookName` VARCHAR(191) NOT NULL,
    `BorrowedDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BorrowDetails_ISBN_key`(`ISBN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurant` (
    `PID` INTEGER NOT NULL,
    `HaveEaten` BOOLEAN NOT NULL,
    `staffID` INTEGER NULL,

    UNIQUE INDEX `Restaurant_PID_key`(`PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Administrators` ADD CONSTRAINT `Administrators_PID_fkey` FOREIGN KEY (`PID`) REFERENCES `Staff`(`PID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowDetails` ADD CONSTRAINT `BorrowDetails_Staff_fkey` FOREIGN KEY (`Staff`) REFERENCES `Staff`(`PID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowDetails` ADD CONSTRAINT `BorrowDetails_Student_fkey` FOREIGN KEY (`Student`) REFERENCES `Students`(`PID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowDetails` ADD CONSTRAINT `BorrowDetails_ISBN_fkey` FOREIGN KEY (`ISBN`) REFERENCES `Library`(`ISBN`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_staffID_fkey` FOREIGN KEY (`staffID`) REFERENCES `Staff`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_PID_fkey` FOREIGN KEY (`PID`) REFERENCES `Students`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
