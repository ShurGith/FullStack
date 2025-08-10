import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import cors, { CorsOptions } from 'cors';



//Conectar a la base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgBlue.italic('Conexion exitosa a la Base de Datos.'));
  } catch (error) {
    console.log(colors.bgRed.underline.red.bold("Hubo un error al conectar con la Base de Datos."));
  }
}
connectDB();

const path = require('path');
//Instancia de Express
const server = express();

//?Permitir conexiones y configurar cors
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    else {
      const msg = `La pagina ${origin} no esta autorizada para conectarse`;
      return callback(new Error(msg), false)
    }
  }
}

server.use(cors(corsOptions));


//Leer datos de formularios del body
server.use(express.json());
// Servir archivos estáticos desde la carpeta src/assets
server.use('/assets', express.static(path.join(__dirname, 'src/assets')));

server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;