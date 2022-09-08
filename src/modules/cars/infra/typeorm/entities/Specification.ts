import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("specifications")
class Specification{

    //atributos
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    //construdor chamado quando a classe é instanciada
    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { Specification }