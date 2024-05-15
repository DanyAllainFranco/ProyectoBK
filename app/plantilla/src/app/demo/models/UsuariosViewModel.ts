export class Usuario {
    usua_Id?: number;
    usua_Usuario?: string;
    usua_Contra?: string;
    usua_Admin?: boolean;
    usuaAdmin: string;
    empleado: string;
    estado: string;
    empl_Id?: number;
    rol_Id?: number;
    usua_Usua_Creacion?: number;
    usua_Fecha_Creacion?: Date;
    usua_Usua_Modifica?: number;
    usua_Fecha_Modifica?: Date;
    usua_Estado?: boolean;
}


export class LlenarUsuario{
    usua_Id: number;
    usua_Usuario: string;
    usuaAdmin: string;
    estado: string;
    usua_Admin: string;
    empl_Id: number;
    rol_Id: number;
    usua_Creacion: string;
    usua_Modifica: string;
    usua_Usua_Creacion: number;
    usua_Fecha_Creacion: string;
    usua_Fecha_Modifica: string;
    rol_Descripcion: string;
    empleado: string;
}

export class UsuarioEnviar {
    Usua_Id?: number;
    Usua_Usuario: string;
    Usua_Contra?: string;
    Usua_Admin?: boolean;
    Empl_Id?: string;
    Rol_Id?: string;
    Usua_Usua_Creacion?: number;
}


export class UsuarioActualizar {
    Usua_Id: number;
    Usua_Usuario: string;
    Usua_Admin: boolean;
    Empl_Id: number;
    Rol_Id: number;
    Usua_Usua_Modifica: number;
}