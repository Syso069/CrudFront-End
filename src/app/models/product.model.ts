export type Product = {
  id: number,
  nome: string,
  preco: number
}

export type ProductCadastrar = Omit<Product, "id">;
