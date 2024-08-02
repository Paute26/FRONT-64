import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoServiceService } from '../servicios/producto-service.service';
import { noWhitespaceValidator } from '../domain/custom-validators';
import { Producto } from '../domain/producto';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {
  searchProductoForm: FormGroup;
  productos: Producto[] = [];
  lista: Producto[] = [];
  listaSearch: Producto[] = [];

  constructor(private fb: FormBuilder, private productoService: ProductoServiceService) {
    this.searchProductoForm = this.fb.group({
      caracteristica: ['', [Validators.required, noWhitespaceValidator]]
    });
    // Inicializar los productos al cargar el componente
    this.cargarProductos();
  }

  // Método para obtener todos los productos
  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
        this.lista = data; // Inicialmente muestra todos los productos
      },
      (error) => {
        console.log('Error al cargar los productos:', error);
      }
    );
  }

  // Método para buscar productos por una característica específica
  buscarProductos(): void {
    const caracteristica = this.searchProductoForm.get('caracteristica')?.value;

    if (!caracteristica || caracteristica.trim() === '') {
      // Si el campo está vacío, mostrar todos los productos
      this.listaSearch = [];
    } else {
      // Filtrar el producto por la característica ingresada
      this.productoService.getProductoPorSerial(caracteristica.trim()).subscribe(
        data => {
          this.listaSearch = data ? [data] : []; // Coloca el producto encontrado en el arreglo de resultados
          console.log("R: ",this.listaSearch.length);
        },
        error => {
          console.log('Error al buscar el producto:', error);
          this.listaSearch = []; // Vacía el arreglo en caso de error
        }
      );
    }
  }
  eliminarProducto(prod: Producto): void {
    
    if (!prod.id) {
      console.error('ID de producto no válido.');
      return;
    }
    // Lógica para eliminar el producto
    console.log("D: ",prod.id)
    
    this.productoService.eliminarProducto(prod.id).subscribe(
      () => {
        // Actualiza la lista de productos después de eliminar
        console.log('Exito');
        this.actualizarProductos();
      },
      error => {
        console.log('Error al eliminar el producto:', error);
      }
    );
  }
  
  // Método para actualizar la lista de productos
  actualizarProductos(): void {
    this.cargarProductos();
  }

  limpiar(){
    this.listaSearch = []; 
  }
}
