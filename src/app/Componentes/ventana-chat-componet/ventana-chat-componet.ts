import { Component,OnInit ,ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatServices } from '../../Services/chat-services';



@Component({
  selector: 'app-ventana-chat-componet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventana-chat-componet.html',
  styleUrl: './ventana-chat-componet.css',
})
export class VentanaChatComponet {
  miId:string| null="";
  uDestino: any = null;
  mensajes:any[]=[];
  mensaje:string=""
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(private chatServices: ChatServices) {}

  ngOnInit() {
    // Nos suscribimos para saber a quién eligió el usuario en el otro componente
    this.chatServices.usuarioSeleccionado$.subscribe(user => {
      this.uDestino = user;
      if (user) {
        console.log("Cargando chat para:", user.nombre);
        this.cargarChat();
        
        // Aquí podrías cargar el historial de mensajes desde tu API
      }
    });
     this.chatServices.escucharMensajes().subscribe((m:any)=>{
     this.mensajes.push(m);
     this.hacerScrollAlFinal();
     })

  }



  //enviarMensaje
  EnviarMensaje(){
   
  const userLog=localStorage.getItem('user');
   const idUser = JSON.parse(userLog || '{}');
   this.miId=idUser.id;

 
    
    const payload={
      'de':this.miId,
      'para':this.uDestino._id,
      'mensaje':this.mensaje,
      'fecha':new Date()
    };
    this.mensajes.push(payload);
    this.chatServices.enviarMensaje(payload);
    console.log("los mensajes",this.mensajes);
    this.mensaje='';


  }

  cargarChat() {
const userLog=localStorage.getItem('user');
   const idUser = JSON.parse(userLog || '{}');
   this.miId=idUser.id;

  this.chatServices.obtenerHistorial(this.miId!, this.uDestino._id)
    .subscribe(data => {
      console.log("chats",data);
      this.mensajes = data; // Reemplazamos los mensajes con el historial de la BD
      
    });
}

hacerScrollAlFinal(): void {
  try {
    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = 
      this.myScrollContainer.nativeElement.scrollHeight;
    }, 100);
  } catch(err) { }
}
}