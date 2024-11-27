import { Component, ElementRef, ViewChild } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editarcamion',
  imports: [],
  templateUrl: './editarcamion.component.html',
  styleUrl: './editarcamion.component.css'
})
export class EditarcamionComponent {
  private id_param: any; //variable que recibira desde URL
  public ID_Camion: number = 0;
  selectFile: File | null = null;

  //Referencia a los elementos HTML
  @ViewChild('matricula') private matricula!: ElementRef; //tanto @ViewChild como ElementRef 
  //se importan desde @angular/core
  @ViewChild('capacidad') private capacidad!: ElementRef;
  @ViewChild('marca') private marca!: ElementRef;
  @ViewChild('modelo') private modelo!: ElementRef;
  @ViewChild('disponibilidad') private disponibilidad!: ElementRef;
  @ViewChild('kilometraje') private kilometraje!: ElementRef;
  @ViewChild('tipo_Camion') private tipo_camion!: ElementRef;  

  ///creo un constructor que haga referencia al servicio que consumira las APIS de la imagwn  insertar camion
  constructor( private service: CamionesService,
    private router: ActivatedRoute //agrego la importacion desde angular/ router
  ){
    //en cuanto inicio mi componente, llamo/Invoco al servicioque consume la api que busca al camion x id
    this.id_param = this.router.params.subscribe((params) =>
    {
      console.log('ID Recuperado: '+ params['id']); //imprtimo en consola el valor del parametro
      this.ID_Camion = params['id']; //asigno el valor del parametro a la variable ID_camion
      this.service.getCamion(this.ID_Camion); //invoco el servicio que consume la API de recuperar un unico camion byID

    }
    );
  }
//creo un objeto que se llama camion (para llenarlo con los datos recuperados de la API instancia Singleton)
get camion(){
  return this.service.camion;
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
    this.service.updateCamion(
      this.ID_Camion,
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
        //Asigno los valores de las variables que se enviaran en la peticion
        const urlfoto = this.service.camion.urlfoto; //paso la imagen original del modelo
        const matricula = this.matricula.nativeElement.value;
        const marca = this.marca.nativeElement.value;
        const modelo = this.modelo.nativeElement.value;
        const disponibilidad = this.disponibilidad.nativeElement.value;
        const tipo_camion = this.tipo_camion.nativeElement.value;
        const kilometraje = this.kilometraje.nativeElement.value;
        const capacidad = this.capacidad.nativeElement.value;
      
        //invoco mi servicio que inserta en el servidor mediante la API
        this.service.updateCamion(
          this.ID_Camion,
           matricula,
           tipo_camion,
          marca,
          modelo,
          capacidad,
          kilometraje,
          urlfoto,
          disponibilidad 
        );
    
  }
    }

}
