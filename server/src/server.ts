import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, {swaggerUiOptions} from './config/swagger';



//Conectar a la base de datos
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgBlue.italic('Conexion exitosa a la Base de Datos.'));
    } catch (error) {
        console.log(colors.bgRed.underline.red.bold( "Hubo un error al conectar con la Base de Datos."));
    }
}
connectDB();

const path = require('path');
//Instancia de Express
const server = express();

//Leer datos de formularios del body
server.use(express.json());
// Servir archivos estáticos desde la carpeta src/assets
server.use('/assets', express.static(path.join(__dirname, 'src/assets')));

server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;