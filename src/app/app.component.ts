import { ProductService } from './service/product.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  abrirModal(){
    throw new Error("Metodo não implementado");
  }

  title = 'crud';

  product: any[] = []

  id: number = 0;
  nome: string = "";
  preco: number = 0;

  constructor(private ProductService: ProductService){
    this.obterProdutoCadastrado();
  }

  obterProdutoCadastrado(){
    this.ProductService.obterProduto()
      .subscribe(products => this.product = products);
  }

  buttonClick(){
    if(!this.nome){
      return alert("Campo nome é obrigatório!");
    }
    if(this.id){
      this.atualizar();
      return;
    }
    if(this.preco < 0){
      alert("Não existe produto com valor negativo!")
    }else{
      this.ProductService.cadastrarProduto({nome: this.nome, preco: this.preco})
        .subscribe(_ => this.obterProdutoCadastrado());
    }
    this.limparFormulario();
  }

  atualizar(){
    this.ProductService.editarProduto({id: this.id, nome: this.nome, preco: this.preco})
      .subscribe(_ => this.obterProdutoCadastrado())
      this.limparFormulario();
  }

  editarProduto(product: Product){
    this.id = product.id;
    this.nome = product.nome;
    this.preco = product.preco;
  }

  deletarProduto(id: number){
    var confirmacao = confirm("Você quer deletar esse produto?")
    if(confirmacao){
      this.ProductService.deletarProduto(id)
        .subscribe(() => this.obterProdutoCadastrado())
        alert("O produto foi deletado!")
    }else{
      alert("O produto não foi deletado!")
    }
  }

  limparFormulario(){
    this.nome = "";
    this.preco = 0;
  }

}
