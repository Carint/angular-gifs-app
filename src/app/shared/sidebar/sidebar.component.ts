import { Component } from '@angular/core';

import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historiales() {
    return this.gifsService.historial;
  }

  constructor( 
    private gifsService: GifsService
  ) { }

  // Método que realiza la busqueda
  buscarItem( item: string ) {
    this.gifsService.buscarGifs(item);
  }
}
