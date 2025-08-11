/* eslint-disable react-refresh/only-export-components */
import { Form, useNavigate, type ActionFunctionArgs, redirect } from "react-router-dom";
import type { Product } from "../types";
import { formatPrice } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
}
export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
  }
  return redirect('/');
}
export default function ProductDetails({ product }: ProductDetailsProps) {
  const navigate = useNavigate();

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">
        {product.name}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {formatPrice(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800 text-center">
        {product.availability ? "Disponible" : "Sin Stock"}
      </td>
      <td className="py-3 text-lg text-gray-800 text-center flex justify-center items-center gap-2">
        <button
          onClick={() => navigate(`/producto/${product.id}/editar`)}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Editar</button>
        <Form
          method="POST"
          action={`/producto/${product.id}/eliminar`}
          className="w-full"
          onSubmit={(e) => {
            if (!confirm("¿Estás seguro de eliminar este producto?")) {
              e.preventDefault()
            }
          }}
        >
          <input
            type="submit"
            value="Eliminar"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </Form>
      </td>
    </tr>
  )
}