/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import { getProducts } from "../services/ProductService";
export async function loader(){
  console.log("Desde el loader de productos");

  return {}
}

getProducts();
export default function Products() {
  return (
    <>
    <div className="flex justify-between">
      <h2 className="text-4xl font-black text-slate-500">
        Productos
      </h2>
      <Link to="/productos/nuevo" className="bg-blue-600 px-3 py-2 rounded-md text-sm text-white hover:bg-blue-700 transition-colors duration-300">Nuevo Producto</Link>
    </div>
    </>
  )
}
