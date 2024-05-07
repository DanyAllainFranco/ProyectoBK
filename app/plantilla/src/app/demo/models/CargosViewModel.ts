export class Cargos {
    carg_Id? : number;
    carg_Descripcion? :string;
    carg_Usua_creacion?: number;
    carg_Fecha_creacion?: Date;
    carg_Usua_Modifica? : number;
    carg_Fecha_Modifica? : Date;
    carg_Estado? : boolean;
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