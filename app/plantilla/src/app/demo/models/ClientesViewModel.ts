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

export class LlenarClientes{
    clie_Id: number;
    clie_Identidad: string;
    clie_Nombre: string;
    clie_Apellido: string;
    clie_Sexo: string;
    clie_Correo: string;
    usua_Creacion: string;
    usua_Modifica: string;
    esta_Id: number;
    muni_Codigo?: string;
    muni_Descripcion: string;
    esta_Descripcion: string;
    dept_Descripcion: string;
    dept_Codigo: string;
    clie_Usua_Creacion?: number;
    clie_Fecha_Creacion?: string;
    clie_Usua_Modifica?: number;
    clie_Fecha_Modifica?: string;
}

export class ClientesEnviar {
    Clie_Id: number;
    Clie_Identidad?: number;
    Clie_Nombre?: string;
    Clie_Apellido?: string;
    Clie_Sexo?: string;
    Clie_Correo?: string;
    Esta_Id?: string;
    Muni_Codigo?: string;
    Clie_Usua_Creacion?: number;
}
