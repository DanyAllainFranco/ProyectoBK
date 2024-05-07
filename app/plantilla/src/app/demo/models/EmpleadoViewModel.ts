export class Empleado {
    empl_Id?: number;
    empl_Identidad?: string;
    empl_Nombre?: string;
    empl_Apellido?: string;
    empl_Sexo?: string;
    empl_Correo?: string;
    esta_Id?: number;
    muni_Codigo?: string;
    carg_Id?: number;
    carg_Descripcion?:string;
    esta_Descripcion?:String;
    muni_Descripcion?:String;
    empl_Usua_Creacion?: number;
    empl_Fecha_Creacion?: Date;
    empl_Usua_Modifica?: number;
    empl_Fecha_Modifica?: Date;
}

export class EmpleadoDDL{
    empl_Id?: number;
    empl_Nombre?: string;
}



export class dropEmpleado{
    value?:String;
    text?:String;
}

export class EmpleadoEnviar {
    Empl_Id:string;
    empl_Identidad: string;
    Empl_Nombre: string;
    Empl_Apellido: string;
    Empl_Sexo: string;
    Empl_Correo:string;
    Muni_Codigo: string;
    Esta_Id: string;
    Carg_Id: string;
  
  


}

export class Fill {
    empl_Id: string;
    empl_Nombre: string;
    empl_Apellido?:String;
    empl_Identidad?:String;
    empl_Sexo?:String;
    muni_Codigo?:String;
    esta_Id?:String;
    carg_Id :string;
    carg_Descripcion?:string;
    esta_Descripcion?:String;
    muni_Descripcion?:String;
    dept_Descripcion?:String;
    empl_Correo:string;

    dept_Codigo?:String;
    // depa_Departamento?:String;
    empl_Usua_Creacion: string;
    empl_Usua_Modifica: string;
    empl_Fecha_Creacion : string;
    empl_Fecha_Modifica : string;
}