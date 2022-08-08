import { v4 as uuidV4 } from 'uuid';

//criando a classe
class Category {

    //atributos
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    //construdor chamado quando a classe é instanciada
    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { Category }