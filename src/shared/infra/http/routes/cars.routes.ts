import { Router } from "express";
import multer  from 'multer';

import  uploadConfig  from '@config/upload';
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post("/", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specifications/:id", 
    ensureAuthenticated, 
    ensureAdmin,
    createCarSpecificationController.handle);

carsRoutes.post("/images/:id",
    ensureAuthenticated, 
    ensureAdmin,
    upload.array("images"),
    uploadCarImagesController.handle);    

export { carsRoutes };