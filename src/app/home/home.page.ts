import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class HomePage {

  planes = [
    {
      nombre: 'Plan Smart 5GB',
      precio: '$15.99/mes',
      segmento: 'Básico / Entrada',
      publico: 'Usuarios casuales, estudiantes, adultos mayores',
      caracteristicas: {
        datos: '5 GB mensuales (4G LTE)',
        minutos: '100 minutos nacionales',
        sms: 'Ilimitados a nivel nacional',
        velocidad: 'Hasta 50 Mbps',
        redes: 'WhatsApp (Consumo normal, descontable)',
        llamadas: '$0.15/min',
        roaming: 'No incluido'
      }
    },
    {
      nombre: 'Plan Premium 15GB',
      precio: '$29.99/mes',
      segmento: 'Medio / Estándar',
      publico: 'Profesionales, usuarios activos de redes sociales',
      caracteristicas: {
        datos: '15 GB mensuales (4G LTE)',
        minutos: '300 minutos nacionales',
        sms: 'Ilimitados a nivel nacional',
        velocidad: 'Hasta 100 Mbps',
        redes: 'WhatsApp, Facebook, Instagram, TikTok GRATIS (ilimitado)',
        llamadas: '$0.10/min',
        roaming: '500 MB incluidos (Sudamérica)'
      }
    },
    {
      nombre: 'Plan Ilimitado Total',
      precio: '$45.99/mes',
      segmento: 'Premium / Alto',
      publico: 'Power users, gamers, streamers, empresarios',
      caracteristicas: {
        datos: 'ILIMITADOS (4G LTE con velocidad completa)',
        minutos: 'ILIMITADOS nacionales',
        sms: 'Ilimitados a nivel nacional',
        velocidad: '4G Hasta 150 Mbps, 5G Hasta 300 Mbps*',
        redes: 'Todas ilimitadas, WhatsApp ilimitado',
        llamadas: '100 minutos incluidos',
        roaming: '5 GB incluidos (todo América)'
      }
    }
  ];

  constructor(private router: Router) {}

  irLogin() {
    this.router.navigate(['/login']);
  }
}
