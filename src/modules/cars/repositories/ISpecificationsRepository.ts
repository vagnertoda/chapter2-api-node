import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    create({description, name}:ICreateSpecificationDTO): void;
    findById(name: string): Specification;
    list(): Specification[];
}

export { ISpecificationsRepository, ICreateSpecificationDTO }