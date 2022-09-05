import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { AppError } from './../../../../errors/AppError';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository){}

    async execute({description, name}: IRequest): Promise<void> {

        const specificationAlreadyExists =  await this.specificationsRepository.findById(name);
        
        if(specificationAlreadyExists)
        {
            throw new AppError("Specification already exists!");
        }

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase }