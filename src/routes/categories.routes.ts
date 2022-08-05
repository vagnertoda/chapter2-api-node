import { Router } from "express";

//repositorio
import { CategoriesRepository } from "../repositories/CategoriesRepository";

//passando o metodos de rota para categoriesRoutes
const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/categories", (request, response) =>{
    //requesitando os atributos do body passado em json
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
        return response.status(400).json({ error: "Name Aleready Exists!" });
    }

    categoriesRepository.create({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get("/categories", (request, response) =>{
    
    const all = categoriesRepository.list();

    return response.json({ all });
});

export { categoriesRoutes };
