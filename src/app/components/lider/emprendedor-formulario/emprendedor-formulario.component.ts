import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emprendedor-formulario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emprendedor-formulario.component.html',
  styleUrls: ['./emprendedor-formulario.component.scss']
})
export class EmprendedorFormularioComponent {
  mostrarModalAceptar = false;
  mostrarModalRechazar = false;

  abrirModal(tipo: 'aceptar' | 'rechazar') {
    this.mostrarModalAceptar = tipo === 'aceptar';
    this.mostrarModalRechazar = tipo === 'rechazar';
  }

  cerrarModal() {
    this.mostrarModalAceptar = false;
    this.mostrarModalRechazar = false;
  }
}
