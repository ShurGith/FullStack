import { Sequelize } from 'sequelize-typescript';
import dotenv from "dotenv";
import Product from '../models/Product.model';
dotenv.config();


const db = new Sequelize(process.env.DATABASE_URL!,{
    models: [__dirname + "../models/**/*.model.ts"]
})  
db.addModels([Product]);
export default db;
