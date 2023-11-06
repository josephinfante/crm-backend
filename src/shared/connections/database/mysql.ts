import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from "../../../../globals";

export const database = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: "mysql",
    }
)