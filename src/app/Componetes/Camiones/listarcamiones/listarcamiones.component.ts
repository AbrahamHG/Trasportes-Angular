import { Component } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarcamiones',
  imports: [CommonModule],
  templateUrl: './listarcamiones.component.html',
  styleUrl: './listarcamiones.component.css'
})
export class ListarcamionesComponent {
//constrcutor que utilice una dependencia de mi servicio (camionesservice)
constructor(private service: CamionesService){
  //EN CUANTO INICIE MI COMPONENTE LLAMO AL SERVICIO QUE consume la api
  this.service.getCamiones();

}
//Recupero la lista de camiones del servicio que se declaro en el mismo, creando asi una instancia singleton
get listCamiones(){
  return this.service.listacamiones;
}

eliminarCamion(id:any){
  

}

}
