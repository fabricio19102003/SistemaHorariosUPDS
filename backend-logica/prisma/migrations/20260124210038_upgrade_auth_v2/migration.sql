/*
  Warnings:

  - The values [ACADEMIC_COORDINATOR] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `role` ENUM('SUPERADMIN', 'ADMIN', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'TEACHER';

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);
