import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AppError } from './../../../../errors/AppError';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ){}

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new AppError("User already exists");
        }

        const passowordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,            
            email,
            driver_license,
            password: passowordHash,
        });
    }
}

export { CreateUserUseCase }