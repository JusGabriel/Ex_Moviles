import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,

          // 🔥 Obligatorio en Ionic + navegador
          storage: localStorage,

          // 🔥 evita problemas de locks, recommended para SPA
          flowType: 'pkce'
        }
      }
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  async getPlanes() {
    const { data, error } = await this.supabase
      .from('planes_moviles')
      .select('*');

    if (error) {
      console.error('Error obteniendo planes:', error.message);
      return [];
    }
    return data;
  }
}
