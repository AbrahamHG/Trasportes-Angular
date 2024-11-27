import { Component, ElementRef, ViewChild } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';
import Swal from 'sweetalert2';
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-insertarcamion',
  imports: [],
  templateUrl: './insertarcamion.component.html',
  styleUrl: './insertarcamion.component.css'
})
export class InsertarcamionComponent {
  selectFile: File | null = null; //variable para almacenar un archivo

  //Referencia a los elementos HTML
  @ViewChild('matricula') private matricula!: ElementRef; //tanto @ViewChild como ElementRef 
  //se importan desde @angular/core
  @ViewChild('capacidad') private capacidad!: ElementRef;
  @ViewChild('marca') private marca!: ElementRef;
  @ViewChild('modelo') private modelo!: ElementRef;
  @ViewChild('disponibilidad') private disponibilidad!: ElementRef;
  @ViewChild('kilometraje') private kilometraje!: ElementRef;
  @ViewChild('tipo_Camion') private tipo_camion!: ElementRef;  
  //Constructor que haga referencia al servicio que consumira las apis de la imagen y de insertar camion
  constructor(private service: CamionesService){

  }
  onFileSelected($event: any){
    //metodo para manejar la imagen selecionada desde formulario
    this.selectFile = $event.target.files[0]; //alamacenamos el archivo selecionado del formulario
    
  }
  guardar(){
//metodo para envir mi camion al servidor inclut¿yendo imagen al servidor API
if(this.selectFile){
//indicamos que hay una imagen creo un FormData para enviarla al servidro
const forData = new FormData();
//agrego la imagen al FormData
forData.append('image',this.selectFile);
//incovo al servicoo que insertara la imagen al servidor, creando una pormesa para retomar la respuesta
this.service.uploadImage(forData).subscribe((response: any)=>{
  //Asigno los valores de las variables que se enviaran en la peticion
  const urlfoto = response; //el nombre de la imagen que me devolvio API
  const matricula = this.matricula.nativeElement.value;
  const marca = this.marca.nativeElement.value;
  const modelo = this.modelo.nativeElement.value;
  const disponibilidad = this.disponibilidad.nativeElement.value;
  const tipo_camion = this.tipo_camion.nativeElement.value;
  const kilometraje = this.kilometraje.nativeElement.value;
  const capacidad = this.capacidad.nativeElement.value;

  //invoco mi servicio que inserta en el servidor mediante la API
  this.service.insertCamion(
     matricula,
     tipo_camion,
    marca,
    modelo,
    capacidad,
    kilometraje,
    urlfoto,
    disponibilidad 
  );
});

}else{
  //Sweet Alert
  Swal.fire('Error','Debe seleccionar una imagen','error');
}
  }

}
