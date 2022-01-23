-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_idProject_fkey";

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
