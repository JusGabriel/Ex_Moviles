import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ChatService, Mensaje } from '../../../core/services/chat';
import { AuthService } from '../../../core/services/auth';
import { SupabaseService } from '../../../core/services/supabase';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class ChatListPage implements OnInit {

  chats: { id_contratacion: string; clienteNombre: string; ultimoMensaje: string }[] = [];

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private supabase: SupabaseService,
    private router: Router
  ) { }

  async ngOnInit() {
    const usuario = await this.authService.getUsuarioCache();
    if (!usuario) return;

    // Obtener contrataciones del usuario
    const { data: contrataciones, error } = await this.supabase.client
      .from('contrataciones')
      .select(`
        id,
        id_usuario,
        usuarios(nombre)
      `)
      .eq('id_usuario', usuario.id)  // solo las del usuario actual
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error obteniendo contrataciones:', error.message);
      return;
    }

    // Construir lista de chats con último mensaje
    this.chats = await Promise.all(
      contrataciones.map(async c => {
        const mensajes: Mensaje[] = await this.chatService.obtenerMensajes(c.id);
        const ultimoMensaje = mensajes.length > 0 ? mensajes[mensajes.length - 1].mensaje : '';
        return {
          id_contratacion: c.id,
          clienteNombre: c.usuarios?.[0]?.nombre || 'Sin nombre',
          ultimoMensaje
        };
      })
    );
  }

  abrirChat(id: string) {
    // Navegar a la página del chat
    this.router.navigate(['/chat-room', id]);
  }
}
