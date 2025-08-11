
import { safeParse } from "valibot";
import { DraftProdutSchema, ProductSchema, ProductsSchema, type Product } from "../types";
import axios from "axios";

type ProductData = {
  [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProdutSchema, {
      name: data.name,
      price: Number(data.price),
    })
    if (result.success) {
      const ulr = `${import.meta.env.VITE_API_URL}/api/products`
      const { data } = await axios.post(ulr, {
        name: result.output.name.trim(),
        price: result.output.price,
      })
      return data;
    } else {
      throw new Error('Invalid data')
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url)
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      console.log(result);
      throw new Error("Hubo un error en la respuesta del servidor ProductService.ts")
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url)
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      console.log(result);
      throw new Error("Hubo un error en la respuesta del servidor ProductService.ts")
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
  try {
  //  const availabilitySchema = pipe(string(), transform(Boolean),boolean() );

    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price:  +data.price,
      availability: data.availability === 'true' ? true : false,
    })
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
      const { data } = await axios.put(url,{
        name: result.output.name.trim(),
        price: result.output.price,
        availability: result.output.availability
      })
      return data;
    } else {
      throw new Error('Invalid data');
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product['id']) {
  console.log(id);
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
     await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
} 