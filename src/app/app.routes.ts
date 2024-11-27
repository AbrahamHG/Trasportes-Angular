import { Routes } from '@angular/router';
import { ListarcamionesComponent} from './Componetes/Camiones/listarcamiones/listarcamiones.component';
import { InsertarcamionComponent } from './Componetes/Camiones/insertarcamion/insertarcamion.component';

export const routes: Routes = [
    //defino mis rutas
    //Ruta vacia o por default
{path: '', component: ListarcamionesComponent},
//Ruta a la lista de camiones
{path: 'listarcamiones', component: ListarcamionesComponent},
{path: 'insertarcamion', component: InsertarcamionComponent},

];
