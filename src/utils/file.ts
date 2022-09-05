import fs from "fs";

export const deleteFile = async(filename: string) => {

    try{
        //se filename existe mantem
        await fs.promises.stat(filename);
    } catch {
        return;        
    }
    //se filename diferente remove
    await fs.promises.unlink(filename);
};