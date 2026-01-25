-- AlterTable
ALTER TABLE `subjects` ADD COLUMN `defaultTeacherId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `subjects_defaultTeacherId_idx` ON `subjects`(`defaultTeacherId`);

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_defaultTeacherId_fkey` FOREIGN KEY (`defaultTeacherId`) REFERENCES `teachers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
