import { AppError } from '@shared/errors/AppError';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carRepositoryInMemory,
            specificationRepositoryInMemory);
    });

    it("should not be able to add a new specification to a now-existent car", async ()=> {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

     it("should be able to add a new specification to the car", async () => {
        const car = await carRepositoryInMemory.create({
            name: "Name Car",
            description: "description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 50,
            brand: "Car Brand",
            category_id: "categoryfk",
        });

        const specification = await specificationRepositoryInMemory.create({
            description: "test",
            name: "test",
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    }); 
});