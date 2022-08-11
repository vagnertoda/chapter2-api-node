import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

const categoryRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController }