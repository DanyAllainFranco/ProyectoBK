export class Clientes {
    Clie_Id?: number;
    Clie_Identidad?: string;
    Clie_Nombre?: string;
    Clie_Apellido?: string;
    Clie_Sexo?: string;
    Clie_Correo?: string;
    Esta_Id?: number;
    Muni_Codigo?: string;
    Muni_Descripcion: string;
    Esta_Descripcion: string;
    Dept_Descripcion: string;
    Dept_Codigo: string;
    Clie_Usua_Creacion?: number;
    Clie_Fecha_Creacion?: Date;
    Clie_Usua_Modifica?: number;
    Clie_Fecha_Modifica?: Date;
    Clie_Estado?: boolean;
}


export class ClientesEnviar {
    Clie_Identidad?: number;
    Clie_Nombre?: string;
    Clie_Apellido?: string;
    Clie_Sexo?: string;
    Clie_Correo?: string;
    Esta_Id?: string;
    Muni_Codigo?: string;
    Clie_Usua_Creacion?: number;
}
