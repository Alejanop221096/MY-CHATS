import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChatServices } from '../../Services/chat-services';
import { LoginServices } from '../../Services/login-services';
import { ChatInicio } from '../../Componentes/chat-inicio/chat-inicio';
import { VentanaChatComponet } from '../../Componentes/ventana-chat-componet/ventana-chat-componet';

@Component({
  selector: 'app-panel-page-component',
  standalone: true,
  imports: [CommonModule,ChatInicio,VentanaChatComponet],
  templateUrl: './panel-page-component.html',
  styleUrl: './panel-page-component.css'
})
export class PanelPageComponent  {

}