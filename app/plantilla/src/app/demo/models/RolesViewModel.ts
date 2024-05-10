export class Roles{
 rol_Id?:number;
 rol_Descripcion?:string;
}

export class Rol{
    rol_Id!: number;
    rol_Descripcion!:string;   
}
export class RolesDLL{
rol_Id?:number;
rol_Descripcion?:string;
}

export class Fill{
    rol_Id: number;
    rol_Descripcion: string;
    pant_Descripcion: [];
    UsuarioCreacion?: string;
    rol_Fecha_Creacion?: string;
    UsuarioModificacion?: string;
    rol_Fecha_Modifica?: string;
    
}


