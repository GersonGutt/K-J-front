import { Categoria } from "./Categoria";
import { Proveedor } from "./Proveedor";
import { detalleProducto } from "./detalleProducto";

export interface Producto {
    id: number;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    precioTotal: number;
    categoria_id: number;
    created_at?: string;
    updated_at?: string;
    imagen?: string;
    action?: string;
    show?: boolean;
    estado: string;
    descripcion: string;
    categoria: Categoria,
    proveedor?: Proveedor,
    detalle_producto?: detalleProducto[];
}
