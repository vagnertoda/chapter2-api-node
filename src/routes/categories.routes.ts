import { Router } from "express";

//repositorio
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

//passando o metodos de rota para categoriesRoutes
const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories", (request, response) =>{
    //requesitando os atributos do body passado em json
    const { name, description } = request.body;
    
    //chama o serviço
    const createCategoryService = new CreateCategoryService(categoriesRepository);
    //
    createCategoryService.execute({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get("/categories", (request, response) =>{
    
    const all = categoriesRepository.list();

    return response.json({ all });
});

export { categoriesRoutes };
