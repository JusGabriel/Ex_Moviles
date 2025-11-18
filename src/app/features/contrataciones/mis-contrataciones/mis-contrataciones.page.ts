import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { ContratacionesService } from '../../../core/services/contrataciones';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-contrataciones',
  templateUrl: './mis-contrataciones.page.html',
  styleUrls: ['./mis-contrataciones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, CommonModule, FormsModule]
})
export class MisContratacionesPage implements OnInit {

  contrataciones: any[] = [];
  userId: string = '';

  constructor(
    private contratacionesService: ContratacionesService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.userId = user.id;
      await this.cargarMisContrataciones();
    }
  }

  async cargarMisContrataciones() {
    this.contrataciones = await this.contratacionesService.obtenerContratacionesPorUsuario(this.userId);
  }

  // 🔹 Navegar a chat de la contratación
  abrirChat(contratacion: any) {
    // Pasamos el id de la contratación y el id del asesor
    this.router.navigate(['/chat', contratacion.id, contratacion.asesorId]);
  }

}
