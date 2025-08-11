import { Router } from 'express';
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - availability
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product.
 *           example: 1
 *         name:
 *           type: string
 *           description: The product's name.
 *           example: iPhone X
 *         price:
 *           type: number
 *           description: The product's price.
 *           example: 999.99
 *         availability:
 *           type: boolean
 *           description: The product's availability.
 *         createdAt:
 *           type: string
 *           description: The auto-generated product's creation datetime.
 *           example: 2023-04-18T15:57:49.000Z
 *         updatedAt:
 *           type: string
 *           description: The auto-generated product's last modification datetime.
 *           example: 2023-04-18T15:57:49.000Z
 *         
 *       example:
 *         id: 1
 *         name: iPhone X
 *         price: 999.99
 *         availability: true
 *         createdAt: 2023-04-18T15:57:49.000Z
 *         updatedAt: 2023-04-18T15:57:49.000Z
 *          
 */ 
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
/**
 * @swagger
 * /api/products:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product' 
 */
/**
 * @swagger
 * /api/products:
 *   patch:
 *     summary: Update an existing product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product' 
 */
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted successfully!
 */
 

router.get('/', getProducts)

router.get('/:id',
    param('id')
        .isInt().withMessage('El id debe ser un entero'),
    handleInputErrors,
    getProductById)

router.post('/',
    //Validación
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('El precio debe ser un número.')
        .notEmpty().withMessage('El precio no puede estar vacío.')
        .custom(value => value > 0).withMessage("El precio debe ser mayor a 0"),
    handleInputErrors,
    createProduct)

//Editar producto
router.put('/:id', 
        //Validación
    param('id')
        .isInt().withMessage('El id debe ser un entero'),
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
        .isNumeric().withMessage('El precio debe ser un número.')
        .notEmpty().withMessage('El precio no puede estar vacío.')
        .custom(value => value > 0).withMessage("El precio debe ser mayor a 0"),
    body('availability')
        .isBoolean().withMessage('La disponibilidad debe ser un valor booleano'),
    handleInputErrors,
    updateProduct)

router.patch('/:id',
    param('id')
        .isInt().withMessage('El id debe ser un entero'),
    handleInputErrors,
    updateAvailability)

router.delete('/:id', 
    param('id')
        .isInt().withMessage('El id debe ser un entero'),
    handleInputErrors,
    deleteProduct
)


export default router;