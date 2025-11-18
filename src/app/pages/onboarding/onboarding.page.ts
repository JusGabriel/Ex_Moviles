import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonCard, 
  IonCardContent 
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonCard, 
    IonCardContent, 
    CommonModule, 
    FormsModule
  ]
})
export class OnboardingPage implements OnInit {

  slides = [
    { title: 'Bienvenido a Tigo Conecta', description: 'Gestiona tus planes móviles de manera fácil y rápida.' },
    { title: 'Chatea con nuestros asesores', description: 'Recibe atención personalizada en tiempo real.' },
    { title: 'Contrata planes al instante', description: 'Accede a nuestro catálogo y elige el plan ideal para ti.' }
  ];

  currentSlide = 0;

  constructor(private router: Router) { }

  ngOnInit() {}

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
