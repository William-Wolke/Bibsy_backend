-- DropForeignKey
ALTER TABLE `BorrowDetails` DROP FOREIGN KEY `BorrowDetails_ISBN_fkey`;

-- AlterTable
ALTER TABLE `BorrowDetails` MODIFY `ISBN` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `Library` MODIFY `ISBN` BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE `BorrowDetails` ADD CONSTRAINT `BorrowDetails_ISBN_fkey` FOREIGN KEY (`ISBN`) REFERENCES `Library`(`ISBN`) ON DELETE RESTRICT ON UPDATE CASCADE;
