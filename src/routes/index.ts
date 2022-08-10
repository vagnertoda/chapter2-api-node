import { Router } from "express";

import { specificationsRouter } from "./specifications.routes";
import { categoriesRoutes } from "./categories.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRouter);

export { router }