import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
    //criando a tabela fake
    private specifications: Specification[];

    //singleton
    private static INSTANCE: SpecificationsRepository;

    //iniciando o array da tabela fake
    constructor(){
        this.specifications = [];
    }   

    //singleton
    public static getInstance(): SpecificationsRepository{
        if(!SpecificationsRepository.INSTANCE){
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }
        return SpecificationsRepository.INSTANCE;
    }
    
    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }

    findById(name: string): Specification {
        const specification = this.specifications.find((specification) => specification.name === name);
        return specification;
    }

    list(): Specification[] {
        return this.specifications;
    }

}

export { SpecificationsRepository }