import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    create({description, name}:ICreateSpecificationDTO): Promise<void>;
    findById(name: string): Promise<Specification>;
    list(): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO }