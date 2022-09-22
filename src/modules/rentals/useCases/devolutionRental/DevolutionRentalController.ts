import { Request, Response } from "express";


class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response>{

        return response.status(201).json();
    }
}

export { DevolutionRentalController }