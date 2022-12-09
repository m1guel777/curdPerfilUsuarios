export interface ClienteResult {
    codigoError:  null;
    mensajeError: null;
    error:        boolean;
    lstResultado: LstResultado[];
}

export interface LstResultado {
    id:                 number;
    nombre:             string;
    descripcion:        string;
    activo:             boolean;
    fecha_registro:     string
    fecha_modificacion: string;
}
