export class Paquetes {
    Paqe__Id?: number;
    Paqe__Descripcion?: string;
    Paqe__Precio?: number;
    Paqe__Imagen?: string;
    Paqe__Usua_Creacion?: number;
    Paqe__Fecha_Creacion?: Date;
    Paqe__Usua_Modifica?: number;
    Paqe__Fecha_Modifica?: Date;
    Paqe__Estado?: boolean;
}



export class LlenarPaquetes{
    paqe_Id: number;
    paqe_Descripcion: string;
    paqe_Precio: string;
    paqe_Imagen : string;
}

export class PaquetesEnviar {
    paqe_Id?: number;
    paqe_Descripcion?: string;
    paqe_Precio?: string;
    paqe_Imagen?: string;
    Paqe_Usua_Creacion?: number;
    Paqe_Usua_Modifica?: number;
}


export class PaquetesDetalles{
    paqe_Id?: number;
    Prod_Id?: number;
    PaCo_Cantidad?: number;
    PaCo_Identificador?: string;
    Usua_Id: number;
}
