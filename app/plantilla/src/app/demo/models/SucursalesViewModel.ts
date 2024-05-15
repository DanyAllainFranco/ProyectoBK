export class Sucursales {
    sucu_Id?: number;
    sucu_Descripcion?: string;
    muni_Codigo?: string;
    empl_Id?: number;
    sucu_Usua_Creacion?: number;
    sucu_Fecha_Creacion?: Date;
    sucu_Usua_Modifica?: number;
    sucu_Fecha_Modifica?: Date;
    sucu_Estado?: boolean;
}


export class SucursalesMostrar {
    sucu_Id?: number;
    sucu_Descripcion?: string;
    muni_Codigo?: string;
    muni_Descripcion: string;
    dept_Descripcion: string;
    empl_Id?: number;
    sucu_Usua_Creacion?: number;
    sucu_Fecha_Creacion?: Date;
    sucu_Usua_Modifica?: number;
    sucu_Fecha_Modifica?: Date;
    sucu_Estado?: boolean;
}
