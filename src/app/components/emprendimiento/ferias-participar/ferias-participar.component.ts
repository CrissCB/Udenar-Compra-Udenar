import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ferias-participar',
  imports: [CommonModule],
  templateUrl: './ferias-participar.component.html',
  styleUrl: './ferias-participar.component.scss'
})
export class FeriasParticiparComponent {

//datos de pruenba
  ferias = [       
  {
    id: 'F-001',
    nombre: 'Feria Agrícola',
    estado: 'Activo',
    Inicio: '15 de mayo',
    fechaCierre: '23 de mayo',
    solicitud: 'ACEPTADA',
    modalidad:'Presencial',
    descripcion:'Feria dirigida a emprendedores con emprendimientos catalogados en la categoria agricola o afines'
  },
  {
    id: 'F-002',
    nombre: 'Expo Feria Andina',
    estado: 'Activo',
    Inicio: '20 de abril',
    fechaCierre: '30 de abril',
    solicitud: 'PENDIENTE',
     modalidad:'Presencial',
    descripcion:'Feria dirigida a emprendedores con emprendimientos catalogados en la categoria agricola o afines'

  },
  {
    id: 'F-003',
    nombre: 'Feria de Innovación',
    estado: 'Inactivo',
    Inicio: '1 de junio',
    fechaCierre: '10 de junio',
    solicitud: 'RECHAZADA',
    modalidad:'Presencial',
    descripcion:'Feria dirigida a emprendedores ....'

  },

];

  participar(){}
  cancelar(){}
  ver(){}


feriaSeleccionada: any = null;

seleccionarFeria(feria: any) {
  this.feriaSeleccionada = feria;
}
}
