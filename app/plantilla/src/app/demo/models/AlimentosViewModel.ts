export class Alimento {
    Alim_Id?: number;
    Alim__Descripcion?: string;
    Alim__Precio?: number;
    Alim__Imagen?: string;
    Alim__Usua_Creacion?: number;
    Alim__Fecha_Creacion?: Date;
    Alim__Usua_Modifica?: number;
    Alim__Fecha_Modifica?: Date;
    Alim__Estado?: boolean;
}

export class CargarAlimentos{
    alim_Id?: number;
    alim_Descripcion?: string;
}


export class dropAlimento{
    value?:String;
    text?:String;
}