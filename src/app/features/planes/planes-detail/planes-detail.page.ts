import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButton, 
  AlertController 
} from '@ionic/angular/standalone';
import { SupabaseService } from '../../../core/services/supabase';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratacionesService } from '../../../core/services/contrataciones';
import { AuthService } from '../../../core/services/auth';

interface Plan {
  id?: string;
  nombre: string;
  precio: number;
  segmento: string;
  imagen_url?: string;
  activo: boolean;
}

@Component({
  selector: 'app-planes-detail',
  templateUrl: './planes-detail.page.html',
  styleUrls: ['./planes-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton,
    CommonModule, FormsModule
  ]
})
export class PlanesDetailPage implements OnInit {

  plan: Plan | null = null;
  userId: string = '';

  constructor(
    private supabase: SupabaseService,
    private route: ActivatedRoute,
    private contratacionesService: ContratacionesService,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController // 🔹 Inyectamos AlertController
  ) { }

  ngOnInit() {
    const planId = this.route.snapshot.paramMap.get('id');
    if (planId) this.cargarPlan(planId);
    this.getUserId();
  }

  async getUserId() {
    const user = await this.authService.getCurrentUser();
    if (user) this.userId = user.id;
  }

  async cargarPlan(id: string) {
    const { data, error } = await this.supabase.client
      .from('planes_moviles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error cargando plan:', error.message);
      return;
    }

    this.plan = data as Plan;
  }

  async contratarPlan() {
    if (!this.plan || !this.userId) return;

    const contratacion = {
      id_usuario: this.userId,
      id_plan: this.plan.id!,
      estado: 'pendiente', // o 'activo' según tu lógica
    };

    try {
      const nueva = await this.contratacionesService.crearContratacion(contratacion);

      if (nueva) {
        // 🔹 Mensaje de éxito
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'El plan se ha contratado correctamente.',
          buttons: ['OK']
        });
        await alert.present();

        // 🔹 Redirigir a Mis Contrataciones
        this.router.navigate(['/mis-contrataciones']);
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo contratar el plan. Intenta nuevamente.',
          buttons: ['OK']
        });
        await alert.present();
      }

    } catch (error) {
      console.error('Error contratando plan:', error);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Ocurrió un error al contratar el plan.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
