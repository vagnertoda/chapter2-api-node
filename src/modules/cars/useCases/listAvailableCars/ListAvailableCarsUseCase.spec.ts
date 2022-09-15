
import { ListCarsUseCase } from "./ListAvailableCarsUseCase"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro teste",
            daily_rate: 110.0,
            license_plate: "AAA-1234",
            fine_amount: 50,
            brand: "Toyota",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car  = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro teste",
            daily_rate: 110.0,
            license_plate: "AAA-1234",
            fine_amount: 50,
            brand: "Car_brand_test",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Car_brand_test",
        });
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car  = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Carro teste",
            daily_rate: 110.0,
            license_plate: "AAA-1234",
            fine_amount: 50,
            brand: "Car_brand_test",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            name: "Car3",
        });
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category_id", async () => {
        const car  = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro teste",
            daily_rate: 110.0,
            license_plate: "AAA-1234",
            fine_amount: 50,
            brand: "Car_brand_test",
            category_id: "category_id2",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "category_id2",
        });
        expect(cars).toEqual([car]);
    });
});