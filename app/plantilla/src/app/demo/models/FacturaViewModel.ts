import { DecimalPipe } from "@angular/common";

export class Factura {
     Sucu_Id?:number;
     Sucu_Descripcion?:string; 
     Empl_Id ?:number;
     Empl_Nombre ?:string;
     Fact_Fecha ?:Date;
     Fact_Total ?:DecimalPipe;
     Clie_Id?:number;
     Clie_Nombre?:String;
     Clie_Identidad?:string;
}



export class FacturaDetalle {

    FaDe_Ident?:number;
    FaDe_Cantidad?:number;
    FaDe_Subtotal?:number;
    FaDe_ProdId?:number;
    Fact_Id?:number;
 }
 
 


 export class FacturaDetalleEnviar {
    FaDe_Ident?:number;
    FaDe_Cantidad?:number;
    FaDe_Subtotal?:number;
    FaDe_ProdId?:number;
    Fact_Id?:number;
 }
 

 export class FacturaEnviar {
    FaDe_Ident?:number;
     Sucu_Id?:number;
     Empl_Id ?:number;
     Empl_Nombre ?:string;
     Fact_Fecha ?:Date;
     Fact_Total ?:DecimalPipe;
     Clie_Id?:number;
     Clie_Nombre?:String;
     Clie_Identidad?:string;
     Fact_Id: string;
     Prod_Nombre?:String;
     FaDe_Cantidad?:number; 
 }
 
export class Complemento{
Comp_Id?:number;
Comp_Descripcion?:string;
}

export class Postre{
Post_Id?:number;
Post_Descripcion?:string;
}


export class Bebida{
    Bebi_Id?:number;
    Bebi_Descripcion?:string;
        
}


export class Combo{
    Comb_Id?:number;
    Comb_Descripcion?:string;
}


export class Paquete{
   Paqe_Id?:number;
   Paqe_Descripcion?:string;
}
