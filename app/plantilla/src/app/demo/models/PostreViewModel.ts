export class Postre {
    Post_Id?: string;
    Post_Descripcion?: string;
    Post_Precio?: string;
    Post_Imagen?: string;
    Post_Usua_Creacion?: string;
    Post_Fecha_Creacion?: string;
    Post_Usua_Modifica?: string;
    Post_Fecha_Modifica?: string;
    Post_Estado?: string;
}

export class LlenarPostres{
    post_id: number;
    post_Descripcion: string;
    post_Precio: string;
    post_Imagen: string;
    usua_Creacion: string;
    usua_Modifica: string;
    post_Fecha_Creacion: string;
    post_Fecha_Modifica: string;
}

export class CargarPostres{
    post_id?: number;
    post_Descripcion?: string;
}

export class Postre2{
    post_id: number;
    post_Descripcion: string;
    post_Precio: string;
    post_Imagen: string;
    post_Usua_Creacion: number;
}

export class PostreActualizar{
    post_id: number;
    post_Descripcion: string;
    post_Precio: string;
    post_Imagen: string;
    post_Usua_Modifica: number;
}

export class dropPostre{
    value?:String;
    text?:String;
}

export class PostreEnviar {
    Post_Id?: string;
    Post_Descripcion?: string;
    Post_Precio?: string;
    Post_Imagen?: string;


}

export class Fill {
    post_Id?: string;
    post_Descripcion?: string;
    post_Precio?: string;
    post_Imagen?: string;
    post_Usua_Creacion?: string;
    post_Fecha_Creacion?: string;
    post_Usua_Modifica?: string;
    post_Fecha_Modifica?: string;
    post_Estado?: string;
}
