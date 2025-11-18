import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

export interface Mensaje {
  id?: string;
  id_contratacion: string;
  remitente: string;
  mensaje: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private channel: any = null;

  constructor(private supabase: SupabaseService) {}

  // ---------------------------
  // Enviar mensaje
  // ---------------------------
async enviarMensaje(mensaje: Mensaje) {
  const { data, error } = await this.supabase.client
    .from('mensajes_chat')
    .insert([mensaje]);

  if (error) {
    console.error('Error enviando mensaje:', error.message);
    return { error }; // ✅ error
  }

  return { data }; // ✅ devolver siempre objeto con data
}


  // ---------------------------
  // Escuchar mensajes en tiempo real
  // ---------------------------
  escucharMensajes(id_contratacion: string, callback: (mensaje: Mensaje) => void) {
    // Cancelar suscripción anterior
    if (this.channel) {
      this.channel.unsubscribe();
    }

    // Crear nueva suscripción
    this.channel = this.supabase.client
      .channel(`chat-${id_contratacion}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensajes_chat',
          filter: `id_contratacion=eq.${id_contratacion}`
        },
        (payload: any) => {
          callback(payload.record);
        }
      )
      .subscribe();
  }

  // ---------------------------
  // Obtener historial de mensajes
  // ---------------------------
  async obtenerMensajes(id_contratacion: string) {
    const { data, error } = await this.supabase.client
      .from('mensajes_chat')
      .select('*')
      .eq('id_contratacion', id_contratacion)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error obteniendo mensajes:', error.message);
      return [];
    }

    return data;
  }

  // ---------------------------
  // Cancelar suscripción
  // ---------------------------
  cancelarSuscripcion() {
    if (this.channel) {
      this.channel.unsubscribe();
      this.channel = null;
    }
  }
}
