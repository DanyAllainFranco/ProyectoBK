export class Promocion {
    Prom_Id?: string;
    Prom_Descripcion?: string;
    Prom_Precio?: string;
    Prom_Imagen?: string;
    Dias_Decripcion?: string;
    Prom_Usua_Creacion?: string;
    Prom_Fecha_Creacion?: string;
    Prom_Usua_Modifica?: string;
    Prom_Fecha_Modifica?: string;
    Prom_Estado?: string;
}
export class dropPromocion{
    value?:String;
    text?:String;
}
export class CargarDias{
    dias_Id?: number;
    dias_Descripcion?: string;
}

export class Promociones {
    prom_Id?: number;
    prom_Descripcion?: string;
    prom_Precio?: string;
    prom_Imagen?: string;
    dias_Id?: string;
}

export class PromocionEnviar {
    Prom_Id?: string;
    Prom_Descripcion?: string;
    Prom_Precio?: string;
    Prom_Imagen?: string;
    Prom_Dia?: string;
}

export class Fill {
    prom_Id?: string;
    prom_Descripcion?: string;
    prom_Precio?: string;
    prom_Imagen?: string;
    prom_Dia?: string;
    prom_Usua_Creacion?: string;
    prom_Fecha_Creacion?: string;
    prom_Usua_Modifica?: string;
    prom_Fecha_Modifica?: string;
    prom_Estado?: string;
}