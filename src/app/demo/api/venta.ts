import { Producto } from "./producto";

export interface Venta {
    cliente:string;
    direccion:string;
    dui:string;
    total:number;
    observaciones?: string;
    gmail?: string;
    fechaVenta:Date;
    productos: Producto[];
}
