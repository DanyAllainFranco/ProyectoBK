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

export class LlenarPromocion{
    prom_Id: number;
    prom_Descripcion: number;
    prom_Precio: string;
    prom_Imagen: string;
    dias_Id: number;
    prom_Fecha_Creacion: string;
    prom_Fecha_Modifica: string;
    dias_Descripcion: string;
    usua_Creacion: string;
    usua_Modifica: string;
}
export class dropPromocion{
    value?:String;
    text?:String;
}
export class CargarDias{
    dias_Id?: number;
    dias_Descripcion?: string;
}

export class AlimentosAgregados{
    alim_Id: string;
    alim_Descripcion:string;   
    code: number;
}

export class SucursalesAgregados{
    sucu_Id: string;
    sucu_Descripcion:string;   
    code: number;
}
export class BebidasAgregadas{
    bebi_Id: string;
    bebi_Descripcion:string;   
    code: number;
}
export class PostresAgregados{
    post_id: string;
    post_Descripcion:string;   
    code: number;
}
export class ComplementosAgregados{
    comp_Id: string;
    comp_Descripcion:string;   
    code: number;
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