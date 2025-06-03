import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feria } from '../../../app-core/interfaces/feria';
import { FeriaService } from "../../../../app/app-core/servicios/feria.service" 

@Component({
  selector: 'app-editar-lider',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-formulario.component.html',
  styleUrls: ['./editar-formulario.component.scss']
})
export class editarLiderForm implements OnInit {
  @Input() ferias: any[] = []; 

  liderForm!: FormGroup;

  idFeria: string = '';
  constructor(private fb: FormBuilder, private feriaService: FeriaService) {}

  ngOnInit(): void {
    this.liderForm = this.fb.group({
      idFeria: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      modalidad: ['', Validators.required],
      localidad: ['', Validators.required],
      estado: ['pendiente', Validators.required]
    });

    this.cargarDatosFeria();
  }

  registrar(): void {
    console.log('Formulario enviado:', this.liderForm.value);
    if (this.liderForm.valid) {
      const datos = {
        ...this.liderForm.value
      }

      this.feriaService.actualizarFeria(this.idFeria, datos).subscribe(
        res => {
          alert('Feria actualizada exitosamente');
          this.liderForm.reset();
        },
        error => {
          console.error('Error al actualizar la feria:', error);
          alert('Error al actualizar la feria. Por favor, inténtalo de nuevo más tarde.');
        }
      );
    } else {
      alert('Por favor completa todos los campos obligatorios.');
    }
  }

  cancelar(): void {
    this.liderForm.reset({
      idFeria: '',
      nombre: '',
      descripcion: '',
      fecha_inicio: '',
      fecha_fin: '',
      modalidad: '',
      localidad: '',
      estado: ''
    });
  }

  cargarDatosFeria(): void {
    this.feriaService.getFerias().subscribe(
      res => {
        this.ferias = res.data as Feria[];
      },
      error => {
        console.error('Error al cargar las ferias:', error);
      }
    );
  }

  cargarDatosFeriaPorId(id: string): void {
    this.feriaService.getFeriaById(id).subscribe(
      res => {
        const feria = res.data as Feria;
        this.liderForm.patchValue({
          idFeria: feria.id,
          nombre: feria.nombre,
          descripcion: feria.descripcion,
          fecha_inicio: this.formatearFecha(feria.fecha_inicio),
          fecha_fin: this.formatearFecha(feria.fecha_fin),
          modalidad: feria.modalidad,
          localidad: feria.localidad,
          estado: feria.estado
        });

        this.idFeria = ''+feria.id; // Guardar el ID de la feria para futuras actualizaciones
      },
      error => {
        console.error('Error al cargar la feria:', error);
      }
    );
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }
}