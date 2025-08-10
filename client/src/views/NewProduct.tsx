/* eslint-disable react-refresh/only-export-components */
import { Link, Form } from "react-router-dom";

export async function action() {
  console.log("desde action");
  return {};
}
export default function NewProduct() {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar  Productos
        </h2>
        <Link to="/" className="bg-blue-600 px-3 py-2 rounded-md text-sm textWhite hover:bg-blue-700 transition-colors duration-300 text-white/80">Volver a Productos</Link>
      </div>
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
          /></label>
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
          />
          </label>
        </div>
        <button
          type="submit"
          className="flex justify-center  items-center  gap-x-10 mt-5 w-full bg-indigo-600 p-2 textWhite font-bold text-lg cursor-pointer rounded text-white/80 hover:bg-indigo-500 transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" className="size-12" viewBox="0 0 48 48">
        <g fill="#ffffffcc" fillRule="evenodd" stroke="#ffffffcc" strokeWidth="2" strokeDasharray="" strokeDashoffset="" strokeOpacity=".99" strokeLinejoin="miter" strokeLinecap="butt"><line x1="24" y1="16.5" x2="24" y2="19.999" fill="none" stroke="#ffffffcc" strokeLinecap="square" strokeMiterlimit="10"></line><polyline points="32 15 32 11.5 24 6.499 16 11.565 16 15" fill="none" stroke="#ffffffcc" strokeLinecap="square" strokeMiterlimit="10"></polyline><polyline points="16 11.5 24 16.5 32 11.5" fill="none" stroke="#ffffffcc" strokeMiterlimit="10"></polyline><polyline points="10 25.25 10 34.25 2 29.25 2 20.315 10 15.249 18 20.25 10 25.25 2 20.315" fill="none" stroke="#ffffffcc" strokeMiterlimit="10"></polyline><polyline points="38 25.25 38 34.25 46 29.25 46 20.25 38 15.249 30 20.315 38 25.25 46 20.25" fill="none" stroke="#ffffffcc" strokeMiterlimit="10"></polyline><line x1="24" y1="34" x2="24" y2="43" fill="none" stroke="#ffffffcc" strokeMiterlimit="10"></line><polygon points="32 29 24 23.999 16 29.065 16 38 24 43 32 38 32 29" fill="none" stroke="#ffffffcc"></polygon><polyline points="16 29 24 34 32 29" fill="none" stroke="#ffffffcc" strokeMiterlimit="10"></polyline><line x1="24" y1="34" x2="24" y2="43" fill="none" stroke="#ffffffcc" strokeMiterlimit="10"></line></g></svg>Registrar Producto </button>
      </Form>
    </>
  )
}
