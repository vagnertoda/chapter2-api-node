import { Router } from "express";

//repositorio
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

//passando o metodos de rota para categoriesRoutes
const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) =>{
   return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) =>{
    
    const all = categoriesRepository.list();

    return response.json({ all });
});

export { categoriesRoutes };
