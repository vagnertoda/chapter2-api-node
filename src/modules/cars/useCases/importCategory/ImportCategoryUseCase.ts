import { parse as csvParse} from "csv-parse";
import { inject, injectable } from "tsyringe";

import fs from "fs";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory{
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepository){}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve, reject) =>{
            //pega o caminho do arquivo
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

           
            const parseFile = csvParse();
            //pega um pedaço lido do arquivo e passa para parseFile
            stream.pipe(parseFile);

            parseFile
            .on("data", async (line)=>{
                // ["name", "description"]
                const [name, description] = line;
                categories.push({
                    name,
                    description,
                });
            })
            .on("end", () => {
                //remove o arquivo apos a leitura
                fs.promises.unlink(file.path);
                resolve(categories);
            })
            .on("error", (err) => {
                reject(err);
            });
        });    
    }

    //recebendo o arquivo vindo do controller insomnia
    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file);
        
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.categoryRepository.findByName(name);

            if(!existCategory){
                await this.categoryRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase }