import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


import { FeriaService } from "../../../../app/app-core/servicios/feria.service" 

@Component({
  selector: 'app-form-feria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './feria-formulario.component.html',
  styleUrls: ['./feria-formulario.component.scss']
})
export class FormFeriaComponent implements OnInit {
  FormFeriaComponent!: FormGroup;

  constructor(private fb: FormBuilder, private feriaService: FeriaService) {}

  ngOnInit(): void {
    this.FormFeriaComponent = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fecha_inicio: [this.getFechaActual(), Validators.required],
      fecha_fin: [this.getFechaActualMasUnDia(), Validators.required],
      modalidad: ['', Validators.required],
      localidad: ['', Validators.required],
      estado: ['pendiente', Validators.required]
    }, { validators: fechasValidas }); 
  }

  registrar(): void {
    console.log('Formulario enviado:', this.FormFeriaComponent.value);
    if (this.FormFeriaComponent.valid) {
      const datos = {
        ...this.FormFeriaComponent.value
      }

      this.feriaService.crearFeria(datos).subscribe(
        res => {
          alert('Feria creada exitosamente');
          this.FormFeriaComponent.reset();
        },
        error => {
          console.error('Error al crear la feria:', error);
          alert('Error al crear la feria. Por favor, inténtalo de nuevo más tarde.');
        }
      );
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }

  cancelar(): void {
    this.FormFeriaComponent.reset();
  }

  private getFechaActual(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  private getFechaActualMasUnDia(): string {
    const mañana = new Date();
    mañana.setDate(mañana.getDate() + 1);
    return mañana.toISOString().split('T')[0];
  }
}

export const fechasValidas: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const fechaElaboracion = group.get('fecha_elaboracion')?.value;
  const fechaVencimiento = group.get('fecha_vencimiento')?.value;

  if (fechaElaboracion && fechaVencimiento) {
    const elaboracion = new Date(fechaElaboracion);
    const vencimiento = new Date(fechaVencimiento);

    if (elaboracion >= vencimiento) {
      return { fechasInvalidas: 'La fecha de elaboración debe ser anterior a la de vencimiento' };
    }
  }

  return null;
};