export class Departamento{
    dept_Codigo?: string;
    dept_Descripcion?:string;
    Usua_Id:number;
}




export class dropDepartamento{
    value?:String;
    text?:String;
}

export class LlenarDepartamento{
    dept_Codigo: string;
    dept_Descripcion: string;;
    usua_Creacion: string;
    usua_Modifica: string;
    dept_Fecha_Creacion: string;
    dept_Fecha_Modifica: string;
}


export class DepartamentoEnviar {
    Dept_Codigo?: string;
    Dept_Descripcion?:string;
}

export class Fill {
    dept_Codigo: string;
    dept_Descripcion:string;
    dept_Usua_Creacion : string;
    dept_Fecha_Creacion:string;
    dept_Usua_Modifica:string;
    dept_Fecha_Modifica:string;   
}