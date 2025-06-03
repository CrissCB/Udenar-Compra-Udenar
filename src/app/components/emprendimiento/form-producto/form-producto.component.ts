import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../app-core/servicios/producto.service';
import { EmprendimientoService } from '../../../app-core/servicios/emprendimiento.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaProducto } from '../../../app-core/interfaces/categoria-producto';
import { SharedDataService } from '../../../app-core/servicios/shared-data.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule]
})
export class FormProductoComponent implements OnInit {
  @Input() producto: any = null;
  @Input() categorias: any[] = [];
  @Input() nombre_emprendimiento: string = '';
  @Input() modoEdicion: boolean = false;
  @Output() onCancel = new EventEmitter();
  @Output() onGuardar = new EventEmitter();
  
  productoForm: FormGroup;
  idEmprendimiento: string = '';
  id_usuario: string = '';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private emprendimientoService: EmprendimientoService,
    private SharedDataService: SharedDataService
  ) { 

    this.productoForm = this.fb.group({
      nombre_emprendimiento: [''],
      nombre: [''],
      detalle: [''],
      precio: [''],
      stock: [''],
      fecha_elaboracion: [''],
      fecha_vencimiento: [''],
      talla: [''],
      codigo_qr: [''],
      id_cat: ['']
    });

  }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      detalle: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      fecha_elaboracion: ['',],
      fecha_vencimiento: ['',],
      talla: [''],
      codigo_qr: [''],
      id_cat: ['', Validators.required],
    }, { validators: fechasValidas });

    this.obtenerUsuario();
    this.obtenerCategoriaProducto();
    this.obtenerIdEmprendimiento();

  }

  obtenerCategoriaProducto() {
    this.emprendimientoService.obtenerCategoriaProducto().subscribe(
      res => {
        this.categorias = res.data as CategoriaProducto[];
        console.log('Categorías de productos obtenidas:', this.categorias);
      }, 
      error => {
        console.error('Error al obtener las categorías de productos:', error);
      }
    );
  }

  obtenerIdEmprendimiento() {
    this.emprendimientoService.obtenerPorId(this.id_usuario).subscribe(
      res => {
        this.idEmprendimiento = res.data.id;
        this.nombre_emprendimiento = res.data.nombre;
        this.productoForm.patchValue({ nombre_emprendimiento: this.nombre_emprendimiento });
      },
      error => {
        console.error('Error al obtener el ID de emprendimiento:', error);
      }
    );
  }

  registrar() {
    if (this.productoForm.valid) {
      const id_cat = parseInt(this.productoForm.value.id_cat);
      this.productoForm.patchValue({ id_cat });
      
      const datos = {
        ...this.productoForm.value,
        id_emprendimiento: this.idEmprendimiento
      };

      
      if (this.modoEdicion) {
        // Actualizar producto existente
        this.productoService.actualizarProducto(this.producto.id, datos).subscribe(
          res => {
            this.onGuardar.emit(datos);
          },
          error => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      } else {
        // Registrar nuevo producto
        this.productoService.crearProducto(datos).subscribe(
          res => {
            alert('Producto registrado exitosamente');
            this.limpiarCampos();
            this.onGuardar.emit(res.data);
          },
          error => {            
            switch (error.error.code) {
              case 400:
                alert(error.error.message + ' Respuesta: ' + JSON.stringify(error.error.data));
                break;
              
              case 500:
                alert('Error interno del servidor. Por favor, inténtelo más tarde.');
                break;

              default:
                alert('Ocurrió un error inesperado. Por favor, inténtelo más tarde.');
                break;
            }
          }
        );
      }
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }

  limpiarCampos(): void {
    this.productoForm.reset();
  }

  cancelar(): void {
    this.onCancel.emit();
    this.limpiarCampos();
    // this.router.navigate(['/productos']); // Ajusta a la ruta de retorno deseada
  }

  obtenerUsuario() {
    this.SharedDataService.idUser$.subscribe(id => this.id_usuario = id ?? '');
  }

  get fechasInvalidas(): string | null {
    const errors = this.productoForm.errors;
    return errors && errors['fechasInvalidas'] ? errors['fechasInvalidas'] : null;
  }

ngOnChanges(changes: SimpleChanges) {
  if (changes['producto'] && this.producto) {
    this.productoForm.patchValue(this.producto);
  }
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