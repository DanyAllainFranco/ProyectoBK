export class ComboPersonal {
    comb_Id?: number;
    Comb_Descripcion?: string;
    Comb_Precio?: string;
    Comb_Imagen?: string;
    Bebi_Id?: string;
    Post_Id?: string;
    Comp_Id?: string;
    Alim_Id?: string;
    Comb_Usua_Creacion?: string;
    Comb_Fecha_Creacion?: string;
    Comb_Usua_Modifica?: string;
    Comb_Fecha_Modifica?: string;

}

export class ComboPEnviar {
    Comb_Id?: number;
    Comb_Descripcion?: string;
    Comb_Precio?: string;
    Comb_Imagen?: string;
    Bebi_Id?: string;
    Post_Id?: string;
    Comp_Id?: string;
    Alim_Id?: string;
    Comb_Usua_Creacion?: number;
    Comb_Usua_Modifica?: number;
}

export class Llenar{
    comb_Id: number;
    alim_Id: number;
    bebi_Id: number;
    comp_Id: number;
    post_Id: number;
    usua_Creacion: string;
    usua_Modifica: string;
    comb_Usua_Creacion: number;
    comb_Fecha_Creacion: string;
    comb_Fecha_Modificacion: string;
    comb_Descripcion: string;
    comb_Precio: string;
    comb_Imagen: string;
    bebi_Descripcion: string;
    post_Descripcion: string;
    comp_Descripcion: string;
    alim_Descripcion: string;
}

export class Fill {
    comb_Id?: string;
    comb_Descripcion?: string;
    comb_Precio?: string;
    comb_Imagen?: string;
    bebi_Id?: string;
    post_Id?: string;
    comp_Id?: string;
    alim_Id?: string;

    bebi_Descripcion?: string;
    post_Descripcion?: string;
    comp_Descripcion?: string;
    alim_Descripcion?: string;

    usua_Creacion: string;
    usua_Modifica: string;
    comb_Usua_Creacion?: string;
    comb_Fecha_Creacion?: string;
    comb_Usua_Modifica?: string;
    comb_Fecha_Modifica?: string;
}


