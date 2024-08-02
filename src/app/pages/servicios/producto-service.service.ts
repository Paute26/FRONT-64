import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../domain/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  private baseUrl = 'http://localhost:8080/evarest/rs/datos'; // Reemplaza con la URL base de tu API
  
  constructor(private http: HttpClient) { }

  // Obtener todos los Productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl + '/list');
  }

  // Obtener un Producto por su serial
  getProductoPorSerial(serial: string): Observable<Producto> {
    return this.http.get<Producto>(this.baseUrl + '/' + serial);
  }


  // Crear un nuevo Producto
  crearProducto(Producto: Producto): Observable<any> {
    return this.http.post(this.baseUrl, Producto);
  }

  // Actualizar un Producto existente
  actualizarProducto(Producto: Producto): Observable<any> {
    return this.http.put(this.baseUrl, Producto);
  }

  // Eliminar un Producto por su codigo
  eliminarProducto(codigo: string): Observable<any> {
    return this.http.delete(this.baseUrl + '?codigo=' + codigo);
  }
}
