import  server  from './server';
import colors from 'colors';

const puerto = process.env.PORT || 3000;

server.listen(puerto, () => {
    console.log(colors.bgYellow(`Ejecutando servidor en el puerto: ${puerto}`));
})