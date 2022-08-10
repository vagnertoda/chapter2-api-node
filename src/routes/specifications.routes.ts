import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";

const specificationsRouter = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRouter.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

specificationsRouter.get("/", (request, response) => {
    return listSpecificationsController.handle(request, response);
});

export { specificationsRouter }


