import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeriaService } from '../../../app-core/servicios/feria.service';

@Component({
  selector: 'app-ferias-participar',
  imports: [CommonModule],
  templateUrl: './ferias-participar.component.html',
  styleUrl: './ferias-participar.component.scss'
})
export class FeriasParticiparComponent {

  ferias: any[] = [];

  constructor(
    private feriaService: FeriaService
  ) {}

  ngOnInit() {
    // Simulación de datos de ferias
    this.ferias = [];
    this.cargarFerias();
  }

  participar(){}
  cancelar(){}
  ver(){}

  feriaSeleccionada: any = null;

  seleccionarFeria(feria: any) {
    this.feriaSeleccionada = feria;
  }

  cargarFerias() {
    this.feriaService.getFerias().subscribe(
      res => {
        this.ferias = res.data;
        console.log('Ferias cargadas:', this.ferias);
      },
      err => {
        console.error('Error al cargar las ferias:', err);
      }
    );
  }
}
