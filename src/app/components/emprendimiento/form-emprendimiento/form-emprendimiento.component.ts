import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-emprendimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-emprendimiento.component.html',
  styleUrls: ['./form-emprendimiento.component.scss']
})
export class FormEmprendimientoComponent implements OnInit {
  emprendimientoForm!: FormGroup;
  categorias = ['Artesanias', 'Comida y bebidas', 'Belleza y cuidado personal', 'Tecnología', 'Ropa y accesorios', 'Servicios', 'Otros'];
  selectedOption: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.emprendimientoForm = this.fb.group({
      nombre: [''],
      marca: [''],
      categoria: [''],
      idUsuario: [{ value: 'ID AUTOMÁTICO', disabled: true }],
      fechaInscripcion: [{ value: new Date().toISOString().substring(0, 10), disabled: true }],
      descripcion: ['']
    });
  }

  limpiarCampos(): void {
    this.emprendimientoForm.reset({
      nombre: '',
      marca: '',
      categoria: '',
      idUsuario: 'ID AUTOMÁTICO',
      fechaInscripcion: new Date().toISOString().substring(0, 10),
      descripcion: ''
    });
  }

  registrar(): void {
    if (this.emprendimientoForm.valid) {
      const datos = {
        ...this.emprendimientoForm.getRawValue()
      };
      console.log('Datos a enviar:', datos);
      // Aquí podrías enviarlos a un servicio
    }
  }

  cancelar(): void {
    console.log('Registro cancelado');
  }
}
