import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ContratacionesService } from '../../../core/services/contrataciones';

@Component({
  selector: 'app-lista-contrataciones',
  templateUrl: './lista-contrataciones.page.html',
  styleUrls: ['./lista-contrataciones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class ListaContratacionesPage implements OnInit {

  contrataciones: any[] = [];

  constructor(private contratacionesService: ContratacionesService) { }

  ngOnInit() {
    this.cargarContrataciones();
  }

  async cargarContrataciones() {
    this.contrataciones = await this.contratacionesService.obtenerContrataciones();
  }

  verContratacion(id: string) {
    console.log('Ver detalle de contratación:', id);
    // Luego se puede navegar a detalle de contratación
  }

}
