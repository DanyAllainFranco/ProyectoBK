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

export class FacturaDetalle{
     
}

export class FacturaDetallesEnviar {
     FaDe_Ident?:String;
     FaDe_ProdId?:String;
     Faxd_Cantidad?:String;
     Fact_Id?:String;
 }

 export class FacturaEnviar {
     Sucu_Id?:number;
     FaDe_Ident?:String;
     Empl_Id ?:number;
     Empl_Nombre ?:string;
     Fact_Fecha ?:Date;
     Fact_Total ?:DecimalPipe;
     Clie_Id?:number;
     Clie_Nombre?:String;
     Clie_Identidad?:string;
 }
 