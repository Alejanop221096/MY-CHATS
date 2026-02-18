import { Routes } from '@angular/router';
import { InicioPageComponent } from './pages/inicio-page-component/inicio-page-component';
import { PanelPageComponent } from './pages/panel-page-component/panel-page-component';
import { ChatInicio } from './Componentes/chat-inicio/chat-inicio';

export const routes: Routes = [
{
    path:'',
    component:InicioPageComponent

},
{
    path:'panelChat',
    component:PanelPageComponent,
    children:[
        {
            path:'',
            component:ChatInicio // se muestra la primera vista de todos los chats que el tenido + se abre el mas recintes y contactos para chatear 
        }
       
        



    ]
}


];
