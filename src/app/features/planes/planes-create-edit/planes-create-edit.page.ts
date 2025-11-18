import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { SupabaseService } from '../../../core/services/supabase';
import { StorageService } from '../../../core/services/storage';

interface Plan {
  id?: string;
  nombre_comercial: string;
  precio: number;
  segmento: string;
  datos: string;
  velocidad: string;
  imagen?: string; // URL en Supabase Storage
}

@Component({
  selector: 'app-planes-create-edit',
  templateUrl: './planes-create-edit.page.html',
  styleUrls: ['./planes-create-edit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, CommonModule, FormsModule]
})
export class PlanesCreateEditPage implements OnInit {

  plan: Plan = {
    nombre_comercial: '',
    precio: 0,
    segmento: '',
    datos: '',
    velocidad: '',
    imagen: ''
  };

  archivoImagen: File | null = null;

  constructor(
    private supabase: SupabaseService,
    private storage: StorageService
  ) { }

  ngOnInit() {}

  seleccionarImagen(event: any) {
    if (event.target.files.length > 0) {
      this.archivoImagen = event.target.files[0];
    }
  }

async guardarPlan() {
  try {
    // 1️⃣ Subir imagen si existe
    if (this.archivoImagen) {
      const nombreArchivo = `${Date.now()}_${this.archivoImagen.name}`;
      const path = await this.storage.subirImagen(this.archivoImagen, nombreArchivo); // subirImagen devuelve path o null
      if (path) {
        const url = this.storage.obtenerUrl(path); // obtener URL pública
        if (url) {
          this.plan.imagen = url; // asignar solo si url existe
        }
      }
    }

    // 2️⃣ Insertar plan (crear o editar)
    if (this.plan.id) {
      // Editar plan existente
      const { data, error } = await this.supabase.client
        .from('planes_móviles')
        .update({ ...this.plan })
        .eq('id', this.plan.id);

      if (error) {
        console.error('Error actualizando plan:', error.message);
        return;
      }

      console.log('Plan actualizado correctamente:', data);
    } else {
      // Crear plan nuevo
      const { data, error } = await this.supabase.client
        .from('planes_móviles')
        .insert([this.plan]);

      if (error) {
        console.error('Error creando plan:', error.message);
        return;
      }

      console.log('Plan creado correctamente:', data);
    }

  } catch (err) {
    console.error(err);
  }
}


}
