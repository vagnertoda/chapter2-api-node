import { Category } from "../../infra/typeorm/entities/Category";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {    
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepository) {}
    
    async execute(): Promise<Category[]>{
        const categories = await this.categoryRepository.list();
        return categories;
    }
}

export { ListCategoriesUseCase }