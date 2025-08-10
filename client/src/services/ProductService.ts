
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
      console.log(data);
    } else{
      throw new Error('Invalid data')
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}