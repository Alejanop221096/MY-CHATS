import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ChatServices {
  public socket: Socket;
  private readonly url: string = 'https://backend-chat-production-b9cf.up.railway.app';

  private seleccionadoSource = new BehaviorSubject<any>(null);
  usuarioSeleccionado$ = this.seleccionadoSource.asObservable();

  constructor( private http:HttpClient) {
    this.socket = io(this.url, { withCredentials: true, autoConnect: false });
  }

  connect() {
    const token = localStorage.getItem('x-auth-token');
    this.socket.io.opts.extraHeaders = { "x-auth-token": token || "" };
    this.socket.connect();
  }

  // CORRECCIÓN AQUÍ: Definimos Observable<void> y obs.next() sin argumentos
  ListOnConnect(): Observable<void> {
    return new Observable<void>(obs => { 
      this.socket.on('lista-conectados', (payload) => {
        
       
        obs.next(payload)}); 
    });
  }


  ListOfUser(id:any){
    
    this.socket.emit('user-conectado-list',id);
  }

  TraerUsuarios(){
    return this.http.get<any[]>(this.url);
  }
  

  //venta-a 
  seleccionarUsuario(usuario: any) {
    console.log("user",usuario);
    this.seleccionadoSource.next(usuario);
  }

  enviarMensaje(payload:any){
    this.socket.emit('message-send',payload);
  }

  escucharMensajes() {
  return new Observable(observer => {
    this.socket.on('message-send', (payload) => {
      observer.next(payload);
    });
  });
}

obtenerHistorial(de: string, para: string): Observable<any[]> {
  // Tu API debe resolver: GET /api/mensajes/1/698b...
  return this.http.get<any[]>(`${this.url}/mensajes/${de}/${para}`);
}


 
}