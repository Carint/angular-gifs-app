import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  // Acceso a los resultados de la busqueda
  get response() {
    return this.gifsService.response;
  }

  constructor(
    private gifsService: GifsService
  ) { }

}
