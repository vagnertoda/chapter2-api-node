import { Router } from "express";

import { specificationsRouter } from "./specifications.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { usersRouter } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { rentalRoutes } from "./rentals.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRouter);
router.use("/users", usersRouter);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use(authenticateRoutes);

export { router } 