import { Router } from "express";

import multer from "multer";

//repositorio
import { CategoriesRepository } from "../modules/cars/repositories/implementations/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController} from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";

//passando o metodos de rota para categoriesRoutes
const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) =>{
   return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) =>{    
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) =>{
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
