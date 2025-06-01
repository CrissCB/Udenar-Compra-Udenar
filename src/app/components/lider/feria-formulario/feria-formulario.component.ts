import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  }, { validators: this.validarFechas() });
  }

  registrar(): void {
    if (this.FormFeriaComponent.valid) {
      this.feriaService.crearFeria(this.FormFeriaComponent.value).subscribe({
        next: (res) => {
          console.log('Feria registrada:', res);
          alert('Feria registrada exitosamente.');
          this.FormFeriaComponent.reset();
        },
        error: (err) => {
          console.error('Error al registrar feria:', err);
          alert('Ocurrió un error al registrar la feria.');
        }
      });
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

  validarFechas() {
  return (formGroup: FormGroup) => {
    const inicio = formGroup.get('fecha_inicio')?.value;
    const fin = formGroup.get('fecha_fin')?.value;

    if (inicio && fin && fin < inicio) {
      formGroup.get('fecha_fin')?.setErrors({ fechaInvalida: true });
    } else {
      formGroup.get('fecha_fin')?.setErrors(null);
    }
  };
}

}
