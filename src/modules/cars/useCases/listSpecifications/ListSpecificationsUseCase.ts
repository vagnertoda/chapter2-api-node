import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";



class ListSpecificationsUseCase {
    constructor(private specificationRepository: ISpecificationsRepository) {}

    execute(): Specification[]{
        const specification = this.specificationRepository.list();
        return specification;
    }

}

export { ListSpecificationsUseCase }