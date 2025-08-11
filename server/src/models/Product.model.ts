import { type } from "os";
import { Table, Column, Model, DataType, PrimaryKey } from "sequelize-typescript";

@Table({
  tableName: 'products'
})  


class Product extends Model {
    @Column({type: DataType.STRING(100), allowNull:false})
    declare name: string;
    @Column({type:DataType.BOOLEAN, defaultValue:true})
    declare availability: boolean;
    @Column({type:DataType.FLOAT, allowNull:true})
    declare price: number;

}

export default Product;