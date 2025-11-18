import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { SupabaseService } from '../../../core/services/supabase';
import { Router } from '@angular/router';

interface Plan {
  id?: string;
  nombre: string;
  precio: number;
  segmento: string;
  imagen_url?: string;
  activo: boolean;
}

@Component({
  selector: 'app-planes-list',
  templateUrl: './planes-list.page.html',
  styleUrls: ['./planes-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class PlanesListPage implements OnInit {

  planes: Plan[] = [];

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarPlanes();
  }

  async cargarPlanes() {
    const { data, error } = await this.supabase.client
      .from('planes_moviles')
      .select('*')
      .eq('activo', true)      // solo activos
      .order('precio', { ascending: true });

    if (error) {
      console.error('Error cargando planes:', error.message);
      return;
    }

    this.planes = data as Plan[];
  }

  verDetalle(id?: string) {
    if (!id) return;
    this.router.navigate(['/planes-detail', id]);
  }
}
