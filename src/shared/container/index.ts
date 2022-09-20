import { container } from "tsyringe";

import "@shared/container/providers";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarsImagesRepository} from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';


// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
 "CategoriesRepository",
 CategoriesRepository
);

//ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

//IUserRepository
container.registerSingleton<IUserRepository>(
    "UsersRepository",
    UsersRepository
);

//ICarsRepository
container.registerSingleton<ICarsRepository>(
    "CarsRepository", 
    CarsRepository
);

//ICarsImagesRepository
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)

//IRentalsRepository
container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)

