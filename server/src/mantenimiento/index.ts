import { exit as exit } from 'process'
import db from '../config/db'

const clearDb = async () => {
  try {
    await db.sync({ force: true })
    console.log('Se han eliminado todos los datos de la base de datos');
    exit(0)
  }
  catch (err) {
    console.error(err)
    exit(1)
  }

}

if(process.argv[2] === '--clear') {
  clearDb()
}
else{
  console.log('No se ha pasado el parametro --clear');
  console.log(process.argv);
  exit(1);
}