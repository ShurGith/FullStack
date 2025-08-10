import { Request, Response } from 'express';
//import { check, validationResult } from "express-validator";
import Product from '../models/Product.model';


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order:[
                ['price','ASC']
            ],
          //  limit:2,
          //  attributes:{exclude:['createdAt','updatedAt']}
        });
        res.json({data: products})
    } catch (error) {
        console.log(error);
    }
}


export const getProductById = async (req: Request, res: Response) => {
    try {
            const id = req.params.id;
            const product = await Product.findByPk(id);
            if (!product){
                return res.status(404).json({error:`No se encontró el producto ${id}`})
            };
            res.json({data:product})
    } catch (error) {
        console.log(error);
    }
}


export const createProduct = async (req: Request, res: Response) => {
    //! INICIO Pasado al Router y con modificaciones de validacion
    /*
    //Validación
    await check('name', 'El nombre es obligatorio').not().isEmpty().run(req);
    
    await check('price')
    .isNumeric() .withMessage( 'El precio debe ser un número.')
    .notEmpty() .withMessage('El precio no puede estar vacío.')
    .custom(value=> value > 0).withMessage("El precio debe ser mayor a 0")
    .run(req);
    
  
    */
    //! FIN Pasado al Router y con modificaciones de validacion
    //! INICIO Se lleva al middleware para validar los campos
    /* e
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    */

    //! FIN pasar al middleware

    //const product = new Product(req.body);
    //const savedProduct = await product.save();

    const product = await Product.create(req.body);
    try {
        res.status(201).json({ data: product })
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
        const {id} = req.params;
        const product = await Product.findByPk(id);
        //? Comprobar si existe el producto en la base de datos
        if (!product){
            return res.status(404).json({error:`No se encontró el producto ${id}`})
        }

     //? Actualizar el producto
     await product.update(req.body);
     await product.save();
        res.json({data:product});
}

export const updateAvailability = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await Product.findByPk(id);
    //? Comprobar si existe el producto en la base de datos
    if (!product){
        return res.status(404).json({error:`No se encontró el producto ${id}`})
    };

    product.availability = !product.dataValues.availability;
    await product.save();
    res.json({data:product});
}

export const deleteProduct = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await Product.findByPk(id);
    //? Comprobar si existe el producto en la base de datos
    if (!product){
        return res.status(404).json({error:`No se encontró el producto ${id}`})
    };
    await product.destroy();
    res.json({message:'Producto eliminado correctamente'})
}