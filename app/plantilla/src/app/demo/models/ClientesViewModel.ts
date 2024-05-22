import { StringValueToken } from "html2canvas/dist/types/css/syntax/tokenizer";

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
    clie_Id?: number;
    clie_Identidad?: number;
    clie_Nombre?: string;
    clie_Apellido?: string;
    clie_Sexo?: string;
    clie_Correo?: string;
    esta_Id?: string;
    muni_Codigo?: string;
    clie_Usua_Creacion?: number;
    clie_Usua_Modifica?: number;
}


export class EmpleadosEnviar {
    Empl_Id: number;
    Empl_Identidad?: number;
    Empl_Nombre?: string;
    Empl_Apellido?: string;
    Empl_Sexo?: string;
    Empl_Correo?: string;
    Esta_Id?: string;
    Carg_Id: number;
    Sucu_Id: number;
    Muni_Codigo?: string;
    Empl_Usua_Creacion?: number;
    Empl_Usua_Modifica?: number;
}


export class LlenarEmpleados{
    empl_Id: number;
    empl_Identidad: string;
    empl_Nombre: string;
    empl_Apellido: string;
    empl_Sexo: string;
    empl_Correo: string;
    usua_Creacion: string;
    usua_Modifica: string;
    carg_Id: number;
    carg_Descripcion: string;
    sucu_Id:number;
    sucu_Descripcion: string;
    esta_Id: number;
    muni_Codigo?: string;
    muni_Descripcion: string;
    esta_Descripcion: string;
    dept_Descripcion: string;
    dept_Codigo: string;
    empl_Usua_Creacion?: number;
    empl_Fecha_Creacion?: string;
    empl_Usua_Modifica?: number;
    empl_Fecha_Modifica?: string;
}
