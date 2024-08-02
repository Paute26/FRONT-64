import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../domain/producto';
import { noWhitespaceValidator } from '../domain/custom-validators';
import { ProductoServiceService } from '../servicios/producto-service.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  nombre: string = '';
  descripcion: string = '';
  extra: string = '';
  crearProductoForm: FormGroup;
  actualizarProductoForm: FormGroup;

  constructor(private fb: FormBuilder, private porductoService: ProductoServiceService ) {
    this.crearProductoForm = this.fb.group({
      nombre: ['', [Validators.required, noWhitespaceValidator]],
      descripcion: ['', [Validators.required, noWhitespaceValidator]],
      caracteristica: ['']
    });

    this.actualizarProductoForm = this.fb.group({
      id: ['', [Validators.required, noWhitespaceValidator]],
      nombre: ['', [Validators.required, noWhitespaceValidator]],
      descripcion: ['', [Validators.required, noWhitespaceValidator]],
      caracteristica: ['']
    });
  }

  onCrearSubmit() {
    if (this.crearProductoForm.invalid) {
      // Verificar qué campos son inválidos y mostrar un mensaje adecuado
      const controls = this.crearProductoForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          alert(`CREAR: \nEl campo ${name} es inválido.`);
          break;
        }
      }
      return;
    }

    const nuevoProducto: Producto = this.crearProductoForm.value;
    console.log('Producto registrado:', nuevoProducto);
    this.guardar(nuevoProducto)
    // Aquí puedes agregar lógica para enviar los datos a un servidor, etc.
  }

  onActualizarSubmit() {
    if (this.actualizarProductoForm.invalid) {
      // Verificar qué campos son inválidos y mostrar un mensaje adecuado
      const controls = this.actualizarProductoForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          alert(`ACTUALIZAR: \nEl campo ${name} es inválido.`);
          break;
        }
      }
      return;
    }

    const productoActualizado: Producto = this.actualizarProductoForm.value;
    console.log('Producto actualizado:', productoActualizado);
    this.actualizar(productoActualizado)
    // Aquí puedes agregar lógica para enviar los datos a un servidor, etc.
  }

  //------------------------------------------------------------------------------------------
  guardar(newProducto: Producto) {
    // Aquí implementa la lógica para guardar los datos
    console.log('Nombre:', newProducto.nombre, 
      'Descripción:', newProducto.descripcion,
       'Serial:', newProducto.caracteristica);
    
    // Llamar al método crearLibro del servicio LibroService para guardar el nuevo libro
    this.porductoService.crearProducto(newProducto)
      .subscribe(
        (respuesta) => {
          console.log('Producto guardado exitosamente:', respuesta);
          // Lógica adicional después de guardar el libro, si es necesario
          this.limpiar;
        },
        (error) => {
          console.error('Error al guardar el Producto:', error);
          // Manejo de errores: mostrar un mensaje de error, registrar el error, etc.
        }
      );
  }

  //Actualizar
  actualizar(newProducto: Producto) {
    // Aquí implementa la lógica para guardar los datos
    console.log('Code:',newProducto.id,'- Nombre:', newProducto.nombre);
    
    // Llamar al método crearLibro del servicio LibroService para guardar el nuevo libro
    this.porductoService.crearProducto(newProducto)
      .subscribe(
        (respuesta) => {
          console.log('Producto guardado exitosamente:', respuesta);
          // Lógica adicional después de guardar el libro, si es necesario
          this.limpiar;
        },
        (error) => {
          console.error('Error al guardar el Producto:', error);
          // Manejo de errores: mostrar un mensaje de error, registrar el error, etc.
        }
      );
  }
  
  limpiar(){
    window.location.reload();
  }
}
