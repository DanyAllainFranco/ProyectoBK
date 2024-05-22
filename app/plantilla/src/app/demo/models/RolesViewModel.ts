export class Roles{
 rol_Id?:number;
 rol_Descripcion?:string;
}

export class Rol{
    rol_Id!: number;
    rol_Descripcion!:string;  
    Rol_Usua_Creacion?:number; 
    Rol_Usua_Modifica?:number; 
}
export class RolesDLL{
rol_Id?:number;
rol_Descripcion?:string;
}

export class Fill{
    rol_Id: number;
    rol_Descripcion: string;
    pant_Descripcion: [];
    usuarioCreacion?: string;
    rol_Fecha_Creacion?: string;
    usuarioModificacion?: string;
    rol_Fecha_Modifica?: string;
    
}


