-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_finishedByUser_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "finishDate" DROP NOT NULL,
ALTER COLUMN "finishedByUser" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_finishedByUser_fkey" FOREIGN KEY ("finishedByUser") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
