import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from 'bcrypt'

export const saveUser = async (request:Request, response: Response) => {

    const { name, email, password} = request.body
    
    try {
        const passwordHash = await bcrypt.hash(password, 8)

        const userRepo = AppDataSource.getRepository(User); 
        const user = await userRepo.save({
            name,
            email,
            password: passwordHash,
        });

        return response.status(201).json({messagem: 'Usuário criado com sucesso!!', user});

    } catch (error) {
        response.status(422).json({ error: "Erro nas entidades!" });
    }
}