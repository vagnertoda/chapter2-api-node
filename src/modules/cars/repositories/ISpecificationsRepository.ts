
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    create({description, name}:ICreateSpecificationDTO): void;
}

export { ISpecificationsRepository, ICreateSpecificationDTO }