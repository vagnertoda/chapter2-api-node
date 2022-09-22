import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
             values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXX')        
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@email.com",
            password: "admin"
        });

        const { token } = responseToken.body;

        await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest",
        })
        .set({
            Authorization: `Bearer ${token}`,
        });        

        const response = await request(app).get("/categories");
        
        //console.log(response.body);

        expect(response.status).toBe(200);
        //expect(response.body.length).toBe(1);
        //expect(response.body[0]).toHaveProperty("id");
        //expect(response.body[0].name).toEqual("Category Supertest");
    });   

});