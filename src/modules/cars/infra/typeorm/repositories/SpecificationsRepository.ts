import { getRepository, Repository } from 'typeorm';
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
    
    private repository: Repository<Specification>;
    
    constructor(){
        this.repository = getRepository(Specification);
    }      
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
           name,
           description, 
        });       

        await this.repository.save(specification);

        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications =  await this.repository.find();
        return specifications;
    }

    async findById(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            name,
        });
        return specification;
    }
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specification = await this.repository.findByIds(ids);
        return specification;
    }
        
    
}

export { SpecificationsRepository }