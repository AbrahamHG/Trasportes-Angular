import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CamionesService {
  //crear una lidta que recibira cualquier tipo de dato
  public listacamiones: any[] = [];
  //dentro del constructor, genero dependencias para consumir mis servicios

  constructor(private http: HttpClient) {
    //inicializo la lista
    this.listacamiones = [];
  }

  //Consumir API que recupere mi lista de camiones

  getCamiones() {
    //con mi cliente http hare la peticion mi url de listarcamiones
    //creando asi una promesa (subscribe) que espera cualquier tipo de respuesta
    // (data:any) y finalmente, cuando obtenga dicha respuesta, la imprimimos en consola
    // y lleno mi objeto listaCamiones
    this.http
      .get('http://localhost:5078/api/Camiones/getCamiones/')
      .subscribe((data: any) => {
        console.log(data);
        this.listacamiones = data;
      });
  }
}
