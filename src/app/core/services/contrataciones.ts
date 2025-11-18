import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase';

export interface Contratacion {
  id?: string;
  id_usuario: string;
  id_plan: string;
  estado: string;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContratacionesService {

  constructor(private supabase: SupabaseService) {}

  // 🔹 Obtener todas las contrataciones
  async obtenerContrataciones() {
    const { data, error } = await this.supabase.client
      .from('contrataciones')
      .select(`
        id,
        id_usuario,
        id_plan,
        estado,
        fecha,
        usuarios(nombre) as usuarioNombre,
        planes_móviles(nombre_comercial, id_asesor) as planDetalle
      `)
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error obteniendo contrataciones:', error.message);
      return [];
    }

    return (data || []).map((item: any) => ({
      id: item.id,
      id_usuario: item.id_usuario,
      usuarioNombre: item.usuarioNombre?.nombre || 'Usuario',
      planNombre: item.planDetalle?.nombre_comercial || 'Plan',
      estado: item.estado,
      fecha: item.fecha,
      asesorId: item.planDetalle?.id_asesor || null
    }));
  }

  // 🔹 Obtener una contratación por id
  async obtenerContratacion(id: string) {
    const { data, error } = await this.supabase.client
      .from('contrataciones')
      .select(`
        id,
        id_usuario,
        id_plan,
        estado,
        fecha,
        usuarios(nombre) as usuarioNombre,
        planes_móviles(nombre_comercial, id_asesor) as planDetalle
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error obteniendo contratación:', error?.message);
      return null;
    }

    const d = data as any;

    return {
      id: d.id,
      id_usuario: d.id_usuario,
      usuarioNombre: d.usuarioNombre?.nombre || 'Usuario',
      planNombre: d.planDetalle?.nombre_comercial || 'Plan',
      estado: d.estado,
      fecha: d.fecha,
      asesorId: d.planDetalle?.id_asesor || null
    };
  }

  // 🔹 Crear nueva contratación
  async crearContratacion(contratacion: Contratacion) {
    const { data, error } = await this.supabase.client
      .from('contrataciones')
      .insert([contratacion]);

    if (error) {
      console.error('Error creando contratación:', error.message);
      return null;
    }

    return data?.[0] || null;
  }

  // 🔹 Filtrar contrataciones de un usuario
  async obtenerContratacionesPorUsuario(userId: string) {
    const todas = await this.obtenerContrataciones();
    return todas.filter(c => c.id_usuario === userId);
  }
}
