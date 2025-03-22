import { Product } from './../models/product.model';
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments/enviroments.development";
import { HttpClient } from "@angular/common/http";
import { ProductCadastrar } from "../models/product.model";

@Injectable({
  providedIn: "root"
})

export class ProductService{
  private url = enviroment.api;

  constructor(private httpCliente: HttpClient){
  }

  obterProduto(){
    return this.httpCliente.get<Product[]>(this.url);
  }

  cadastrarProduto(product: ProductCadastrar){
    return this.httpCliente.post<Product[]>(this.url, product);
  }

  editarProduto(product: Product){
    return this.httpCliente.put<Product>(`${this.url}/${product.id}`, product)
  }

  deletarProduto(id: number){
    return this.httpCliente.delete<void>(`${this.url}/${id}`)
  }
}
