export class NavItemModel {

    public id: number;
    public description: string;
    public urn: string;
    public roles: string[];
    public icon : string;

    constructor(id: number, description: string, urn: string, roles: string[], icon : string = '') {
        this.id = id;
        this.description = description;
        this.urn = urn;
        this.roles = roles;
        this.icon = icon
    }

}
