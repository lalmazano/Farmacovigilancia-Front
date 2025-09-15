import { Roles } from "../guards/roles";

export class OptionModel {

    public id: number;
    public descripcion: string;
    public abv?: string;
    public funcion? : string;
    public superior? : number;
    public valorNumerico?: number;
    public rol?:Roles

    constructor() {
        this.id = 0;
        this.descripcion = '';
        this.funcion = '';
    }

}
