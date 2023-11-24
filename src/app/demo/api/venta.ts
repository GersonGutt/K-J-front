import { Producto } from "./producto";

export interface Venta {
    cliente:string;
    direccion:string;
    dui:string;
    total:number;
    fechaVenta:Date;
    productos: Producto[];
}
