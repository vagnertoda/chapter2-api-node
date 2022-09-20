import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from './../../../../shared/errors/AppError';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        //@inject("CarRepository")
       // private carsRepository: ICarsRepository
        ){}

    async execute({
        user_id, 
        car_id, 
        expected_return_date
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;

        //não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o nome carro
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car is unavailable");
        }

        //não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for user!");
        }

        //o aluguel deve ter duração minima de 24 horas
        const dateNow = this.dateProvider.dateNow();
                
        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date            
        );              

        if(compare < minimumHour){
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase }