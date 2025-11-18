import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private bucket = 'planes-imagenes';

  constructor(private supabase: SupabaseService) {}

  // Subir imagen
  async subirImagen(file: File, path: string): Promise<string | null> {
    const { data, error } = await this.supabase.client.storage
      .from(this.bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error subiendo imagen:', error.message);
      return null;
    }

    return data.path;
  }

  // Obtener URL pública
  obtenerUrl(path: string): string | null {
    const { data } = this.supabase.client.storage
      .from(this.bucket)
      .getPublicUrl(path);

    if (!data || !data.publicUrl) {
      console.error('No se pudo obtener URL pública');
      return null;
    }

    return data.publicUrl;
  }

  // Eliminar imagen
  async eliminarImagen(path: string): Promise<boolean> {
    const { error } = await this.supabase.client.storage
      .from(this.bucket)
      .remove([path]);

    if (error) {
      console.error('Error eliminando imagen:', error.message);
      return false;
    }

    return true;
  }
}
