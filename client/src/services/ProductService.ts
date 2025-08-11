
import  {safeParse } from "valibot"
import { DraftProdutSchema } from "../types";
import  axios from "axios";

type ProductData = {
  [k: string]: FormDataEntryValue
}
  
export async function addProuct(data : ProductData) {
  try {
    const result = safeParse(DraftProdutSchema, {
      name: data.name,
      price: Number(data.price),
    })
    if(result.success){
      const ulr = `${import.meta.env.VITE_API_URL }/api/products`
      const { data } = await axios.post(ulr, { 
        name: result.output.name,
        price: result.output.price,
      })
      return data;
    } else{
      throw new Error('Invalid data')
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const {data} = await axios.get(url)
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}