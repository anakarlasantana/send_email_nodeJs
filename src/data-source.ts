require('dotenv').config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    url: process.env.DATABASE_URL,
    type: "postgres",
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT), 
    username: process.env.PGUSER,
    password: process.env.DB_PASS,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
