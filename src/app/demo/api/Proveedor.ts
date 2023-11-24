import { productoProveedor } from './productoProveedor';
export interface Proveedor {
    id?: number;
    nombre: string;
    telefono: string;
    created_at?: string;
    updated_at?: string;
    direccion: string;
    empresa: string;
    descuento: number;
    estado: number;
    editar?:boolean;
    productoProveedor?: productoProveedor;
    productos?: productoProveedor;
}
