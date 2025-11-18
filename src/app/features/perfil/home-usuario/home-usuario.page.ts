// home-usuario.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.page.html',
  styleUrls: ['./home-usuario.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonRouterOutlet, RouterModule]
})
export class HomeUsuarioPage {

  constructor(private router: Router) {}

  irPerfil() { this.router.navigate(['/home-usuario/perfil']); }
  irMisPlanes() { this.router.navigate(['/home-usuario/mis-planes']); }
  irInicio() { this.router.navigate(['/home-usuario/inicio']); }
  irChat() { this.router.navigate(['/home-usuario/chat']); }

}
