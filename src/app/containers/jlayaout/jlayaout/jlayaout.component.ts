import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEmprendimientoComponent } from '../../../components/emprendimiento/form-emprendimiento/form-emprendimiento.component';

@Component({
  selector: 'app-jlayaout',
  standalone: true,
  templateUrl: './jlayaout.component.html',
  styleUrls: ['./jlayaout.component.scss'],
  imports: [CommonModule, FormEmprendimientoComponent]
 

})

export class JlayaoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('JlayaoutComponent initialized');
    // Initialization logic can go here
  }
 logoPath = 'assets/images/logo.png';
  isCollapsed = false;

  menu = [
    {
      title: 'EMPRENDIMIENTO',
      open: false,
      subitems: ['Registrar', 'Editar', 'Publicar']
    },
    {
      title: 'PRODUCTO',
      open: false,
      subitems: ['Registrar', 'Editar', 'Publicar']
    },
    {
      title: 'FERIAS',
      open: false,
      subitems: ['Participar', 'Editar', 'Convocatorias']
    },
    {
      title: 'MANUAL',
      open: false,
      subitems: []
    }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


  
toggleSection(item: any) {
  item.open = !item.open;
}


selectSubItem(subitem: string, section: string, event: Event) {
  event.preventDefault();
  this.selectedOption = `${section}-${subitem}`.toLowerCase();
}

  selectedOption: string = '';

getIcon(option: string): string {
  switch (option.toLowerCase()) {
    case 'registrar':
      return 'fas fa-plus-circle';
    case 'editar':
      return 'fas fa-edit';
    case 'publicar':
      return 'fas fa-upload';
    case 'participar':
      return 'fas fa-users';
    case 'convocatorias':
      return 'fas fa-bullhorn';
    default:
      return 'fas fa-circle';
  }
}




}






