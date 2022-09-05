import { Router } from "express";

import { specificationsRouter } from "./specifications.routes";
import { categoriesRoutes } from "./categories.routes";
import { usersRouter } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRouter);
router.use("/users", usersRouter);
router.use(authenticateRoutes);

export { router } 