import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonFooter } from '@ionic/angular/standalone';
import { ChatService, Mensaje } from '../../../core/services/chat';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, 
    IonInput, IonButton, IonFooter, CommonModule, FormsModule
  ]
})
export class ChatRoomPage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content!: IonContent;

  mensajes: Mensaje[] = [];
  nuevoMensaje: string = '';
  idContratacion: string = '1'; // 🔹 Cambiar según navegación
  usuarioActualEmail: string = '';

  constructor(private chatService: ChatService, private authService: AuthService) { }

  async ngOnInit() {
    // 1️⃣ Obtener usuario actual
    const usuario = await this.authService.getUsuarioCache();
    this.usuarioActualEmail = usuario?.email || 'Yo';

    // 2️⃣ Obtener historial de mensajes
    this.mensajes = await this.chatService.obtenerMensajes(this.idContratacion);

    // 3️⃣ Escuchar mensajes en tiempo real
    this.chatService.escucharMensajes(this.idContratacion, (mensaje: Mensaje) => {
      // Evitar duplicados si el mensaje ya lo enviamos nosotros
      if (!this.mensajes.find(m => m.id === mensaje.id)) {
        this.mensajes.push(mensaje);
        this.scrollToBottom();
      }
    });

    // Scroll inicial
    setTimeout(() => this.scrollToBottom(), 200);
  }

  ngOnDestroy() {
    this.chatService.cancelarSuscripcion();
  }

  async enviar() {
    if (!this.nuevoMensaje.trim()) return;

    const mensaje: Mensaje = {
      id_contratacion: this.idContratacion,
      remitente: this.usuarioActualEmail,
      mensaje: this.nuevoMensaje
    };

    // Enviar mensaje a Supabase
const result = await this.chatService.enviarMensaje(mensaje);

if (!result.error) {
  // Agregar mensaje localmente
  this.mensajes.push(mensaje);
  this.scrollToBottom();
  this.nuevoMensaje = '';
} else {
  console.error('Error al enviar mensaje:', result.error.message);
}

  }

  scrollToBottom() {
    setTimeout(() => this.content.scrollToBottom(300), 100);
  }
}
