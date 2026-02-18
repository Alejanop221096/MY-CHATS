import { Component,OnInit } from '@angular/core';
import { LoginServices } from '../../Services/login-services';
import { filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ChatServices } from '../../Services/chat-services';

@Component({
  selector: 'app-chat-inicio',
  imports: [CommonModule],
  templateUrl: './chat-inicio.html',
  styleUrl: './chat-inicio.css',
})
export class ChatInicio implements OnInit {

private idUser=localStorage.getItem('user');
listaUsuarios:any[]=[];

userConectads:any[]=[];


  constructor(private loginServices:LoginServices,private chatServices:ChatServices){}
  
 ngOnInit(): void {
    
   this.chatServices.connect();
   

    this.chatServices.ListOnConnect().subscribe((res:any)=>{
      this.userConectads= res;
      console.log('IDs conectados recibidos:', res);
      this.actualizarEstadoUsuarios();

    })

    this.mostrarListaUsuarios();
    this.usuariosConectados(this.idUser);
    

   

    

  }

  usuariosConectados(idUser:any){
  
    const{id}=JSON.parse(idUser);
   //para el estado
  
  this.chatServices.ListOfUser(id);
  }

  mostrarListaUsuarios() {
  this.loginServices.getUsuarios().subscribe((data) => {
    // Mapeamos el array para inyectar el estado inicial
    this.listaUsuarios = data.usuarios.map((u: any) => { 
      return {
        ...u,
        status: 'offline' // Todos empiezan desconectados
      };
    });

    this.actualizarEstadoUsuarios();
  });
}


actualizarEstadoUsuarios() {
  if (this.listaUsuarios.length === 0) {
    console.warn("La lista de usuarios de la DB aún está vacía.");
    return;
  }

  this.listaUsuarios = this.listaUsuarios.map((u: any) => {
    // 1. Verificamos qué ID tiene el objeto (u._id o u.uid)
    // Hacemos un log del primero para estar seguros
    if (this.listaUsuarios.indexOf(u) === 0) {
       console.log("Estructura de un usuario de la DB:", u);
       console.log("Buscando este ID en el array de sockets:", u.uid || u._id);
    }

    // 2. Comparamos. Importante: usa tanto u.uid como u._id por si acaso
    const isOnline = this.userConectads.includes(u.uid) || this.userConectads.includes(u._id);
    
    return {
      ...u,
      status: isOnline ? 'online' : 'offline'
    };
  });
}

// Dentro de tu clase ChatInicio
abrirChat(usuario: any) {
  console.log('Seleccionando a:', usuario.nombre);
  this.chatServices.seleccionarUsuario(usuario);
}

}
