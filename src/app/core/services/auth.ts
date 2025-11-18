import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioCache: any = null;

  constructor(private supabase: SupabaseService) {}

  // ---------------------------
  // Registro de usuario
  // ---------------------------
async signUp(
  email: string, 
  password: string, 
  nombre: string, 
  rol: 'usuario_registrado' | 'asesor' = 'usuario_registrado'
) {
  // Crear usuario en Supabase Auth
  const { data, error } = await this.supabase.client.auth.signUp({
    email,
    password
  });

  if (error) {
    console.error('Error creando usuario:', error.message);
    return { error };
  }

  // Insertar en tabla usuarios con el rol
  const { error: insertError } = await this.supabase.client
    .from('usuarios')
    .insert({
      id: data.user?.id,
      nombre,
      email,
      rol
    });

  if (insertError) {
    console.error('Error insertando usuario:', insertError.message);
    return { error: insertError };
  }

  return { user: data.user };
}


  // ---------------------------
  // Login de usuario
  // ---------------------------
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error iniciando sesión:', error.message);
      return { error };
    }

    // Limpiar cache del usuario al iniciar sesión
    this.usuarioCache = null;

    return { session: data.session };
  }
  

  // ---------------------------
  // Logout
  // ---------------------------
  async signOut() {
    const { error } = await this.supabase.client.auth.signOut();
    if (error) {
      console.error('Error cerrando sesión:', error.message);
      return { error };
    }

    this.usuarioCache = null;
    return true;
  }

  // ---------------------------
  // Obtener usuario actual desde Supabase Auth
  // ---------------------------
  async getCurrentUser(reintentos = 3) {
    for (let i = 0; i < reintentos; i++) {
      try {
        const { data: { user } } = await this.supabase.client.auth.getUser();
        return user;
      } catch (err: any) {
        if (err.name === 'NavigatorLockAcquireTimeoutError') {
          console.warn('Lock ocupado, reintentando getCurrentUser...', i + 1);
          await new Promise(res => setTimeout(res, 100));
        } else {
          console.error('Error inesperado en getCurrentUser:', err);
          return null;
        }
      }
    }
    return null;
  }

  // ---------------------------
  // Obtener datos del usuario desde la tabla 'usuarios'
  // ---------------------------
  async getUsuarioTabla(reintentos = 3) {
    for (let i = 0; i < reintentos; i++) {
      try {
        const user = await this.getCurrentUser();
        if (!user) return null;

        const { data, error } = await this.supabase.client
          .from('usuarios')
          .select('*')
          .eq('id', user.id); // 🔹 sin .single()

        if (error) {
          console.error('Error obteniendo usuario desde tabla:', error.message);
          return null;
        }

        if (!data || data.length === 0) return null;

        return data[0]; // devolver el primer objeto del array
      } catch (err: any) {
        if (err.name === 'NavigatorLockAcquireTimeoutError') {
          console.warn('Lock ocupado, reintentando getUsuarioTabla...', i + 1);
          await new Promise(res => setTimeout(res, 200));
        } else {
          console.error('Error inesperado en getUsuarioTabla:', err);
          return null;
        }
      }
    }
    return null;
  }

  // ---------------------------
  // Cachear usuario para no solicitar múltiples veces
  // ---------------------------
  async getUsuarioCache() {
    if (this.usuarioCache) return this.usuarioCache;

    const usuario = await this.getUsuarioTabla();
    this.usuarioCache = usuario;
    return usuario;
  }

}
