import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _apiKey: string = 'aI42UARpx3O8W7hpbk6L5KQlw7i8206q';
  private _servicioUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public response: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(
    private http:HttpClient
  ) {
    this._historial = JSON.parse(localStorage.getItem('history')!) || [];
    this.response = JSON.parse(localStorage.getItem('lastSearch')!) ||[];
  }

  // Método que realiza la busqueda y realiza la peticion http
  buscarGifs( query: string = '' ) {
    // Convierte el valor de la busqueda a minusculas
    query = query.trim().toLocaleLowerCase();

    // Verifica que no sea vacio y que no este incluido en el arreglo
    if(query.trim().length > 0 && !this._historial.includes(query)) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      // Guardar el historial en el localStorage
      localStorage.setItem('history', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    // Mostrar los datos de la consulta con HttpClient
    this.http.get<SearchGIFResponse>(`${ this._servicioUrl }/search`, { params })
      .subscribe( ( resp ) => {
        this.response = resp.data;

        // Guardar la ultima busqueda en localStorage
        localStorage.setItem('lastSearch', JSON.stringify(this.response));
      });

    // Mostrar los datos de la consulta utilizado JS
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=aI42UARpx3O8W7hpbk6L5KQlw7i8206q&q=dbz&limit=10')
    //   .then( resp => {
    //     resp.json()
    //       .then( data => {
    //         console.log(data);
    //       })
    //   })
  }
}
