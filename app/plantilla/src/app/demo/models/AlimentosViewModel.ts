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

export class Alimento3{
    alim_Id?: number;
    Alim_Descripcion?: string;
    Alim_Precio?: number;
    Alim_Imagen?: string;
}
export class Alimentos {
    alim_Id?: number;
    alim_Descripcion?: string;
    code: number;
}

export class Alimento2{
    alim_Id: number;
    alim_Descripcion: string;
    alim_Precio: string;
    alim_Imagen: string;
    alim_Usua_Creacion: number;
}

export class AlimentoActualizar{
    alim_Id: number;
    alim_Descripcion: string;
    alim_Precio: string;
    alim_Imagen: string;
    alim_Usua_Modifica: number;
}

export class CargarAlimentos{
    alim_Id?: number;
    alim_Descripcion?: string;
}

export class LlenarAlimentos{
    alim_Id: number;
    alim_Descripcion: string;
    alim_Precio: string;
    alim_Imagen: string;
    usua_Creacion: string;
    usua_Modifica: string;
    alim_Fecha_Creacion: string;
    alim_Fecha_Modifica: string;
}

export class dropAlimento{
    value?:String;
    text?:String;
}