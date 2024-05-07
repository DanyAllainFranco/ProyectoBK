export class Municipio {
    muni_Codigo?: string;
    muni_Descripcion?: string;
    dept_Codigo?: string;
}

export class MunicipioEnviar {
    Muni_Codigo: string;
    Muni_Descripcion: string;
    Dept_Codigo: string;
}

export class Fill {
    muni_Codigo: string;
    muni_Descripcion: string;
    dept_Codigo: string;
    muni_Usua_Creacion?: string;
    muni_Fecha_Creacion?: string;
    muni_Usua_Modifica?: string;
    muni_Fecha_Modifica?: string;
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
