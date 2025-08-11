
/* eslint-disable react-refresh/only-export-components */
import { Link, Form, useActionData, type ActionFunctionArgs, type LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProuct, getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
export async function loader({ params }: LoaderFunctionArgs) {
  if(params.id !== undefined){
    const producto = await getProductById(+params.id);
    if(!producto){
      return redirect("/");
    }
    return producto;
  }
}
export async function action({ request, params } : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = ""
 if (Object.values(data).some((value) => !value)) {
    error = "Todos los campos son obligatorios"
    console.log(error)
  }
  if(error.length)
    return error;
  if(params.id !== undefined){
   await updateProduct(data, +params.id);
   return
  }
}

export default function EditProduct() {
  const error = useActionData() as string;
  const producto =  useLoaderData() as Product;
  const availabilityOptions = [
   { name: 'Disponible', value: true},
   { name: 'Sin Stock', value: false}
]
return(
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Editando un Producto Existente
        </h2>
        <Link to="/" className="bg-blue-600 px-3 py-2 rounded-md text-sm textWhite hover:bg-blue-700 transition-colors duration-300 text-(--white-apagado)">Volver a Productos</Link>
      </div>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <Form
        className="mt-10"
        method="POST"
      >
        <div className="mb-4">
          <label
            className="text-gray-800"
          >Nombre Producto:
            <input
              id="name"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Nombre del Producto"
              name="name"
              defaultValue={producto.name}/>
              </label>

        </div>
        <div className="mb-4">
          <label
            className="text-gray-800"
          >Precio:
            <input
              id="price"
              type="number"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Precio Producto. ej. 200, 300"
              name="price"
              defaultValue={producto.price}
            />
          </label>
        </div>

    <div className="mb-4">
        <label
            className="text-gray-800"
            htmlFor="availability"
        >Disponibilidad:</label>
        <select 
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={producto?.availability.toString()}
        >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>{option.name}</option>
            ))}
        </select>
    </div>
        <button
          type="submit"
          className="flex justify-center  items-center  gap-x-10 mt-5 w-full bg-indigo-600 p-2 textWhite font-bold text-lg cursor-pointer rounded  text-(--white-apagado) hover:bg-indigo-500 transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" className="size-10 inline-block mr-2" viewBox="0 0 48 48"><title>cycle</title><g><path d="M14.587,19.91A.983.983,0,0,0,15,20a1,1,0,0,0,.658-.247l8-7a1,1,0,0,0,0-1.506l-8-7A1,1,0,0,0,14,5v5A14.016,14.016,0,0,0,.017,24.705,14.269,14.269,0,0,0,14.406,38H17a1,1,0,0,0,1-1V35a1,1,0,0,0-1-1H14A10.011,10.011,0,0,1,4.023,23.314,10.215,10.215,0,0,1,14,14.016V19A1,1,0,0,0,14.587,19.91Z" fill="#ffffffcc"></path><path d="M47.983,24.705A14.016,14.016,0,0,0,34,10H31a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1h3a10.011,10.011,0,0,1,9.977,10.686A10.215,10.215,0,0,1,34,33.984V29a1,1,0,0,0-1.658-.753l-8,7a1,1,0,0,0,0,1.506l8,7A1,1,0,0,0,33,44a.983.983,0,0,0,.413-.09A1,1,0,0,0,34,43V37.981A14.248,14.248,0,0,0,47.983,24.705Z" fill="#c0c0c0f5"></path></g></svg>Guardar Cambios</button>
      </Form>
    </>
  )
} 
 