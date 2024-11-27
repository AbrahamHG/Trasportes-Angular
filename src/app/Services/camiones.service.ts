import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CamionesService {
  //crear una lidta que recibira cualquier tipo de dato
  public listacamiones: any[] = [];
  public camion: any; //un camion unico o individual
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

  getCamion(id:number){
    this.http.get('http://localhost:5078/api/Camiones/getCamiones/'+id).subscribe((data: any) => {
      console.log(data);
      this.camion = data;
    });
  }

//Subir imagen por medio de la API
//Agrego la importacion desde RxJS (Reactive Extension for Javascript) para 'Observarla'

uploadImage(forData:FormData): Observable<string> {
console.log(forData);
//hago la peticion POST para enviar la imagen al servidor
return this.http.post('http://localhost:5078/api/Camiones/upload',forData).pipe(
  //agrego la importacion desde RxJS para 'map' ---mapeo
  map((response:any)=>{
  console.log(response);
  return response.uniqueFileName
})
);
}
//Instalo Sweet Alert
//Consumir la API que inserta un nuevo camion
insertCamion(
  //iD_CAMION: string,
  matricula: string,
  tipO_CAMION: string,
  marca: string,
  modelo: string,
  capacidad: string,
  kilometraje: number,
  urlfoto: string,
  disponibilidad: string
){

  //convertir el valor de la disponibilidad a un booleano
  let bool: Boolean = true;
  bool = disponibilidad == '0' ? false: true;

  //realizo mi peticion http POST
  this.http.post('http://localhost:5078/api/Camiones/insertCamion',
    {
  iD_CAMION: 0,
  matricula: matricula,
  tipO_CAMION: tipO_CAMION,
  marca: marca,
  modelo: modelo,
  capacidad: capacidad,
  kilometraje: kilometraje,
  urlfoto: urlfoto,
  disponibilidad: bool
    })
    .subscribe((response: any)=>{
if(response.respuesta.toUpperCase().includes('ERROR')){
  ///Sweet Alet
  Swal.fire('Error',response.respuesta,'error');
}else{

 Swal.fire('Correcto',response.respuesta,'success').then(()=>
 {
window.location.replace('/listarcamiones')
 }); 
}

    });
}

//Consumir la API que actualiza un nuevo camion
updateCamion(  
  iD_CAMION: number,
  matricula: string,
  tipO_CAMION: string,
  marca: string,
  modelo: string,
  capacidad: string,
  kilometraje: number,
  urlfoto: string,
  disponibilidad: string
){
//convertir el valor de la disponibilidad a un booleano
let bool: Boolean = true;
bool = disponibilidad == '0' ? false: true;

this.http.put('http://localhost:5078/api/Camiones/updateCamion',{
  
  iD_CAMION: iD_CAMION,
  matricula: matricula,
  tipO_CAMION: tipO_CAMION,
  marca: marca,
  modelo: modelo,
  capacidad: capacidad,
  kilometraje: kilometraje,
  urlfoto: urlfoto,
  disponibilidad: bool

})
.subscribe((response: any)=>{
if(response.respuesta.toUpperCase().includes('ERROR')){
///Sweet Alet
Swal.fire('Error',response.respuesta,'error');
}else{

Swal.fire('Correcto',response.respuesta,'success').then(()=>
{
window.location.replace('/listarcamiones')
}); 
}

});

}

//Consumir la API que elimina un nuevo camion
deleteCamion(id: any) {
  const swalWithTailwindButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
      cancelButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
    },
    buttonsStyling: false,
  });

  swalWithTailwindButtons
    .fire({
      title: 'Estás seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Siuuuuuu',
      cancelButtonText: 'Tons no',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Llamada a la API para eliminar el camión
        this.http
          .delete('http://localhost:5078/api/Camiones/delete/' + id)
          .subscribe((response: any) => {
            console.log(response);
            if (response.respuesta.toUpperCase().includes('ERROR')) {
              swalWithTailwindButtons.fire({
                title: 'Error',
                text: response.respuesta,
                icon: 'error',
              });
            } else {
              if (response.respuesta.toUpperCase().includes('IDENTIFICADOR')) {
                swalWithTailwindButtons.fire({
                  title: 'Ops!',
                  text: response.respuesta,
                  icon: 'info',
                });
              } else {
                swalWithTailwindButtons
                  .fire({
                    title: 'Eliminado',
                    text: response.respuesta,
                    icon: 'success',
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithTailwindButtons.fire({
          title: 'Cancelado',
          text: 'Tu operación ha sido cancelada',
          icon: 'info',
        });
      }
    });
}

}
