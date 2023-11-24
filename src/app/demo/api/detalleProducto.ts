import { Proveedor } from "./Proveedor";
import { Producto } from "./producto";

export interface detalleProducto {
id: number;
clave?: string;
fechaIngreso?: string;
fechaEgreso?: string;
reservado: number;
estado: number;
cantidad: number;
show: boolean;
producto?: Producto;
proveedor?: Proveedor;
}
