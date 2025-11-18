import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, 
  IonInput, IonButton, IonCard, IonCardContent, IonSegment, IonSegmentButton 
} from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonInput,
    IonButton, IonCard, IonCardContent,
    IonSegment, IonSegmentButton
  ]
})
export class RegisterPage implements OnInit {

  nombre: string = '';
  email: string = '';
  password: string = '';
  rolSeleccionado: 'usuario_registrado' | 'asesor' = 'usuario_registrado'; // valor por defecto

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {}

  async registrarUsuario() {
    if (!this.nombre || !this.email || !this.password) {
      alert('Por favor complete todos los campos');
      return;
    }

    const result = await this.auth.signUp(
      this.email,
      this.password,
      this.nombre,
      this.rolSeleccionado
    );

    if (result.error) {
      alert('Error registrando usuario: ' + result.error.message);
      return;
    }

    alert('Usuario registrado correctamente como ' + this.rolSeleccionado);
    this.router.navigate(['/login']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }
}
