import { Project } from "@prisma/client";

interface IProjectDto {
  id: string,
  name: string,
  User_Project: {
    idProject: string;
    idUser: number;
  }[];


}

export { IProjectDto }