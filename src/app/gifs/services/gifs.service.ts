import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _apiKey: string = 'aI42UARpx3O8W7hpbk6L5KQlw7i8206q';
  private _historial: string[] = [];

  public response: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(
    private http:HttpClient
  ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  // Método que realiza la busqueda y realiza la peticion http
  buscarGifs( query: string = '' ) {
    // Convierte el valor de la busqueda a minusculas
    query = query.trim().toLocaleLowerCase();

    // Verifica que no sea vacio y que no este incluido en el arreglo
    if(query.trim().length > 0 && !this._historial.includes(query)) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      // Guardar en el localStorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // Mostrar los datos de la consulta utilizado JS
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=aI42UARpx3O8W7hpbk6L5KQlw7i8206q&q=dbz&limit=10')
    //   .then( resp => {
    //     resp.json()
    //       .then( data => {
    //         console.log(data);
    //       })
    //   })

    // Mostrar los datos de la consulta con HttpClient
    this.http.get<SearchGIFResponse>(`http://api.giphy.com/v1/gifs/search?api_key=aI42UARpx3O8W7hpbk6L5KQlw7i8206q&q=${ query }&limit=9`)
      .subscribe( ( resp ) => {
        console.log( resp.data );
        this.response = resp.data;
      });
  }
}
