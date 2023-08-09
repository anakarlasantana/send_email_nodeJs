import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

export const saveUser = async (request: Request, response: Response) => {

    const { name, email, password } = request.body

    try {
        const passwordHash = await bcrypt.hash(password, 8)

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.save({
            name,
            email,
            password: passwordHash,
        });

        return response.status(201).json({ messagem: 'Usuário criado com sucesso!!', user });

    } catch (error) {
        response.status(422).json({ error: "Erro nas entidades!" });
    }
}


export const login = async (request: Request, response: Response) => {

    const { email, password } = request.body

    try {

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.find({
            where: {
                email
            }
        });

        if (await bcrypt.compare(password, user[0].password)) {
            const data = {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
            }

            return response.json(data)
        } else {
            return response.status(404).json({ message: 'Usuário não encontrado!' })
        }

    } catch (error) {
        response.status(404).json({ error: "Usuário não encontrado!" });
    }
}


export const forgotPassword = async (request: Request, response: Response) => {

    const { email } = request.body

    try {

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.find({
            where: {
                email
            }
        });

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'damion.thiel44@ethereal.email',
                pass: 'snraMvbNqNJtSMsrhx'
            }
            });

        const newPassword = crypto.randomBytes(4).toString("hex");

        transporter.sendMail({
            from: 'Administrador <c0c993106b-e02306@inbox.mailtrap.io>',
            to: email,
            subject: 'Recuperação de senha!',
            text: `Olá,
            Parece que você solicitou a recuperação de senha para a sua conta em nosso sistema. 
            Para garantir a segurança de sua conta, sua nova senha para acessar o sistema é: ${newPassword}.`
        }).then(
            () => {
                bcrypt.hash(newPassword, 8).then(
                    password => {
                        AppDataSource.getRepository(User).update(user[0].id, {
                            password
                        }).then(
                            () => {
                                return response.status(200).json({ message: 'Email enviado!' })
                            }
                        ).catch(
                            () => {
                                return response.status(404).json({ message: 'Email não encontrado!' })
                            }
                        )
                    }
                )


            }
        )

    } catch (error) {
        response.status(404).json({ error: "Falha no envio do email!" });
    }
}