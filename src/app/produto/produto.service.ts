import { Injectable } from '@angular/core'
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http'
import { Produto } from './produto/produto.model'
import { PRODUTO_API } from '../app.api'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'


@Injectable()
export class ProdutoService{

    constructor(private http: Http){}

    ObterListaProdutos(): Observable<Produto>{
      const url = `${PRODUTO_API}/produto`;

      return this.http.get(url)
        .map(response => response.json());
    }

    Inserir(produto : Produto): Observable<string> {
      const url = `${PRODUTO_API}/produto`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      this.http.post(url, JSON.stringify(produto), options)
      .map(response => response)
      .subscribe((retorno: string) => {
        console.log(`Retorno: ${retorno}`)
        window.location.reload();
      });
    }

    Alterar(produto : Produto) {
      const url = `${PRODUTO_API}/produto/${produto._id}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      this.http.put(url, JSON.stringify(produto), options)
        .map(res => res)
        .subscribe((retorno: string) => {
          console.log(`Retorno: ${retorno}`)
          window.location.reload();
        });
    }

    Excluir(id: string) {
       const url = `${PRODUTO_API}/produto/${id}`;

       this.http.delete(url)
        .map(res => res)
        .subscribe((retorno: string) => {
          console.log(`Retorno: ${retorno}`)
          window.location.reload();
        });
    }
}
