import { inject, injectable } from "tsyringe";

import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

//usando os principios de SOLID SRP, DIP e LSP(Liskow)
@injectable()
class CreateCategoryUseCase {
    //usando um hack do java script criando um construtor com tipagem
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository){}

    async execute({ description, name}: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists){
            throw new AppError("Category already exists!");
        }

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase }