export class UserModel{
    username:string;
    roles:string[];
    token?:string;
    nombre?:string;

    constructor(){
        this.username ='';
        this.roles =[];
        this.token = '';}
}