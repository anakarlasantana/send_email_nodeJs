import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "containers-us-west-43.railway.app",
    port: 6015,
    username: "postgres",
    password: "lL6yUMjEW9wMTegyM4Ef",
    database: "railway",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
