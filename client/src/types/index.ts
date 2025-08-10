import { number, object, string  }  from "valibot"

export const DraftProdutSchema = object({
  name: string(),
  price: number(),
})