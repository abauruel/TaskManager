-- DropForeignKey
ALTER TABLE "User_Project" DROP CONSTRAINT "User_Project_idProject_fkey";

-- DropForeignKey
ALTER TABLE "User_Project" DROP CONSTRAINT "User_Project_idUser_fkey";

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_idProject_fkey" FOREIGN KEY ("idProject") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
