-- CreateTable
CREATE TABLE `Permissions` (
    `PID` VARCHAR(191) NOT NULL,
    `AccessToLibrary` BOOLEAN NOT NULL DEFAULT false,
    `AccessToResturant` BOOLEAN NOT NULL DEFAULT false,
    `AccessToUser` BOOLEAN NOT NULL DEFAULT false,
    `AccessToServer` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Permissions_PID_key`(`PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `PID` VARCHAR(191) NOT NULL,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,
    `isPersonal` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Staff_PID_key`(`PID`),
    UNIQUE INDEX `Staff_Email_key`(`Email`),
    UNIQUE INDEX `Staff_PhoneNumber_key`(`PhoneNumber`),
    PRIMARY KEY (`ID`)
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
CREATE TABLE `Login` (
    `UserName` VARCHAR(191) NOT NULL,
    `PassWord` VARCHAR(191) NOT NULL,
    `PID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Login_UserName_key`(`UserName`),
    UNIQUE INDEX `Login_PID_key`(`PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Template` (
    `ID` BIGINT NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Price` INTEGER NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `Company` VARCHAR(191) NOT NULL,
    `RegisterDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Template_Name_key`(`Name`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Library` (
    `NTI_s_ID` INTEGER NOT NULL,
    `ItemName` VARCHAR(191) NOT NULL,
    `ISBN` BIGINT NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Author` VARCHAR(191) NOT NULL,
    `Language` VARCHAR(191) NOT NULL,
    `Publisher` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Cover` VARCHAR(191) NOT NULL,
    `Pages` INTEGER NOT NULL,
    `Publish_Date` DATETIME(3) NOT NULL,
    `TemplateID` INTEGER NULL,

    UNIQUE INDEX `Library_NTI_s_ID_key`(`NTI_s_ID`),
    UNIQUE INDEX `Library_ItemName_key`(`ItemName`),
    UNIQUE INDEX `Library_ISBN_key`(`ISBN`),
    UNIQUE INDEX `Library_Title_key`(`Title`),
    UNIQUE INDEX `Library_Cover_key`(`Cover`),
    PRIMARY KEY (`ISBN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BorrowDetails` (
    `NTI_ID` INTEGER NOT NULL,
    `Student_ID` VARCHAR(191) NOT NULL,
    `Staff_ID` VARCHAR(191) NOT NULL,
    `Date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BorrowDetails_NTI_ID_key`(`NTI_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurant` (
    `PID` INTEGER NOT NULL,
    `staffID` INTEGER NULL,
    `HaveEaten` BOOLEAN NOT NULL,

    UNIQUE INDEX `Restaurant_PID_key`(`PID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Permissions` ADD CONSTRAINT `Permissions_PID_fkey` FOREIGN KEY (`PID`) REFERENCES `Staff`(`PID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Library` ADD CONSTRAINT `Library_ItemName_fkey` FOREIGN KEY (`ItemName`) REFERENCES `Template`(`Name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowDetails` ADD CONSTRAINT `BorrowDetails_Staff_ID_fkey` FOREIGN KEY (`Staff_ID`) REFERENCES `Staff`(`PID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowDetails` ADD CONSTRAINT `BorrowDetails_Student_ID_fkey` FOREIGN KEY (`Student_ID`) REFERENCES `Students`(`PID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowDetails` ADD CONSTRAINT `BorrowDetails_NTI_ID_fkey` FOREIGN KEY (`NTI_ID`) REFERENCES `Library`(`NTI_s_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_staffID_fkey` FOREIGN KEY (`staffID`) REFERENCES `Staff`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_PID_fkey` FOREIGN KEY (`PID`) REFERENCES `Students`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
