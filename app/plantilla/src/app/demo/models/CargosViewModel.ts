export class Cargos {
    Carg_Id? : number;
    Carg_Descripcion? :string;
}

export class Cargo{
    carg_Id?:String;
    Carg_Descripcion?:String;
}


export class CargoEnviar {
    Carg_Id: string;

    Carg_Cargo: string;
}


export class dropCargo{
    value?:String;
    text?:String;
}


export class Fill {
    carg_Id: string;
    carg_Descripcion: string;
    carg_Usua_Creacion: string;
    carg_Fecha_Creacion: string;
    carg_Usua_Modifica : string;
    carg_Fecha_Modifica : string;
}