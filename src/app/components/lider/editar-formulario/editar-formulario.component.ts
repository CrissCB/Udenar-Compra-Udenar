import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-lider',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-formulario.component.html',
  styleUrls: ['./editar-formulario.component.scss']
})
export class editarLiderForm implements OnInit {
  liderForm!: FormGroup;

  idFeria: string = 'FeriaId123';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  this.liderForm = this.fb.group({
    nombre: ['', Validators.required],
    fechaInicio: [this.getFechaActual(), Validators.required],
    fechaCierre: [this.getFechaActualMasUnDia(), Validators.required],
    descripcion: ['']
  });
}

  registrar(): void {
    if (this.liderForm.valid) {
      console.log('Formulario válido:', this.liderForm.value);
      alert('Líder registrado exitosamente');
      this.liderForm.reset();
    } else {
      alert('Por favor complete todos los campos obligatorios.');
    }
  }

  cancelar(): void {
    this.liderForm.reset();
  }

  private getFechaActual(): string {
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, '0');
  const day = String(hoy.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

  private getFechaActualMasUnDia(): string {
  const mañana = new Date();
  mañana.setDate(mañana.getDate() + 1); // Suma un día

  const year = mañana.getFullYear();
  const month = String(mañana.getMonth() + 1).padStart(2, '0');
  const day = String(mañana.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

 
}


