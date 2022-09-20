import { Router } from "express";

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRoutes }