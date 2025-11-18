import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonCard, 
  IonCardContent,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular/standalone';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
    IonLabel, IonInput, IonButton, IonCard, IonCardContent,
    IonSegment, IonSegmentButton,
    CommonModule, FormsModule
  ]
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  selectedRole: 'usuario' | 'asesor' = 'usuario'; // Valor por defecto

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

async login() {
  // Valor quemado para login de prueba como asesor
  if (this.email === 'gpji549588@gmail.com' && this.password === '123456') {
    this.selectedRole = 'asesor';
  }

  if (!this.email || !this.password) {
    alert('Por favor ingrese email y contraseña');
    return;
  }

  // Saltamos AuthService, login “simulado”
  console.log('Sesión iniciada como asesor');

  if (this.selectedRole === 'usuario') {
    this.router.navigate(['/home-usuario']);
  } else {
    this.router.navigate(['/home-asesor']); // Home del asesor
  }
}


  explorarComoInvitado() {
    // Solo para usuarios, redirige al Home en modo lectura
    this.router.navigate(['/home']);
  }

  irRegistro() {
    // Redirigir a la página de registro
    this.router.navigate(['/register']);
  }
}
