import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home-asesor',
  templateUrl: './home-asesor.page.html',
  styleUrls: ['./home-asesor.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonRouterOutlet, RouterModule]
})
export class HomeAsesorPage {

  constructor(private router: Router) {}

  irPerfil() { this.router.navigate(['/home-asesor/perfil']); }
  irPlanes() { this.router.navigate(['/home-asesor/planes-create']); }
  irChat() { this.router.navigate(['/home-asesor/chat']); }
  irContrataciones() { this.router.navigate(['/home-asesor/lista-contrataciones']); }

}
