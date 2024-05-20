export class Municipio {
    muni_Codigo?: string;
    muni_Descripcion?: string;
    dept_Codigo?: string;
}

export class MunicipioEnviar {
    Muni_Codigo: string;
    Muni_Descripcion: string;
    Dept_Codigo: string;
    Muni_Usua_Creacion?: number;
    Muni_Usua_Modifica?: number;
}
export class Municipio2{
    muni_Codigo: number;
    muni_Descripcion: string;
    dept_Codigo: string;
    Muni_Usua_Creacion?: number;
    Muni_Usua_Modifica?: number;
}

export class Fill {
    muni_Codigo: string;
    muni_Descripcion: string;
    dept_Codigo: string;
    usua_Creacion?: string;
    muni_Fecha_Creacion?: string;
    usua_Modifica?: string;
    muni_Fecha_Modifica?: string;
    
}
export class CargarMunicipios{
    muni_Codigo?:String;
    muni_Descripcion?:String;
}


export class dropMunicipio{
    value?:String;
    text?:String;
    muni_Usua_Creacion?: number;
    muni_Fecha_Creacion?: Date;
    muni_Usua_Modifica?: number;
    muni_Fecha_Modifica?: Date;
}
export class DropMunicipios{
    muni_Codigo?: string;
    muni_Descripcion?: string;
}
