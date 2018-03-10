import { Component, OnInit } from '@angular/core';
import { Produto } from './produto.model';
import { ProdutoService } from './produto.service';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {
  listaprodutos: Produto[];
  prodModel: Produto;
  isNovo: Boolean = false;
  tipoOperacao: string = 'Salvar';

  constructor(private produtoService : ProdutoService) {}

  ngOnInit() {
     this.produtoService.ObterListaProdutos()
      .subscribe(listaprodutos => this.listaprodutos = listaprodutos);
  }

  Novo() {
    this.prodModel = new Produto();
    this.tipoOperacao = 'Salvar';
    this.isNovo = true;
  }

  Salvar() {

    if (this.tipoOperacao === 'Salvar') {
      this.produtoService.Inserir(this.prodModel);
    } else {
      this.produtoService.Alterar(this.prodModel);
    }

    window.location.reload();
    this.isNovo = false;
  }

  Editar(produto: Produto) {
    this.prodModel = new Produto();
    this.prodModel = produto;
    this.tipoOperacao = 'Alterar';
    this.isNovo = true;
  }

  Deletar(id: string) {
    this.produtoService.Excluir(id);
    window.location.reload();
  }

  Cancelar() {
    this.isNovo = false;
  }
}
