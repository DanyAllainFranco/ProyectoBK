export class Bebidas {
    Bebi_Id?: number;
    Bebi_Descripcion?: string;
    Bebi_Precio?: number;
    Bebi_Imagen?: string;
    Bebi_Usua_Creacion?: number;
    Bebi_Fecha_Creacion?: Date;
    Bebi_Usua_Modifica?: number;
    Bebi_Fecha_Modifica?: Date;
    Bebi_Estado?: boolean;
}
export class Bebida {
    bebi_Id?: number;
    bebi_Descripcion?: string;
}
export class Postre {
    post_id?: number;
    post_Descripcion?: string;
}
export class Complemento {
    comp_Id?: number;
    comp_Descripcion?: string;
}

export class CargarBebidas{
    bebi_Id?: number;
    bebi_Descripcion?: string;
    Bebi_Precio?: number;
    Bebi_Imagen?: string;
}

export class dropBebida{
    value?:String;
    text?:String;
}