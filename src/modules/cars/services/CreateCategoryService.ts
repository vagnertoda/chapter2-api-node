import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

//usando os principios de SOLID SRP, DIP e LSP(Liskow)
class CreateCategoryService {
    //usando um hack do java script criando um construtor com tipagem
    constructor(private categoriesRepository: ICategoriesRepository){}

    execute({ description, name}: IRequest): void {
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists){
            throw new Error("Category already exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService }