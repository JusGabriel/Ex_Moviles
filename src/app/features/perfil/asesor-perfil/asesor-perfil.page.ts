import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-asesor-perfil',
  templateUrl: './asesor-perfil.page.html',
  styleUrls: ['./asesor-perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class AsesorPerfilPage implements OnInit {

  nombre: string = '';
  email: string = '';
  rol: string = '';

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    // Trae la info del asesor desde tu tabla de usuarios
    const usuario = await this.authService.getUsuarioTabla();
    if (usuario) {
      this.nombre = usuario.nombre;
      this.email = usuario.email;
      this.rol = usuario.rol;
    }
  }

}
