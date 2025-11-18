import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.page.html',
  styleUrls: ['./usuario-perfil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class UsuarioPerfilPage implements OnInit {

  nombre: string = '';
  email: string = '';
  rol: string = '';

  constructor(private authService: AuthService) { }

async ngOnInit() {
  const authUser = await this.authService.getCurrentUser();
  console.log('Usuario Auth:', authUser); // <-- mira qué sale aquí

  const usuario = await this.authService.getUsuarioCache();
  console.log('Usuario Tabla:', usuario); // <-- mira qué sale aquí

  if (usuario) {
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.rol = usuario.rol;
  }
}



}
