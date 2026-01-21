export interface RegisterFormType{
    username:string;
    id:string;
    password:string;
    email:string;
    phone:number;
    birthdate:string;
}

export interface User{
    username:string;
    id:string;
    password:string;
    email:string;
    phone:number;
    birthdate:string;
}

export interface LoginFormType{
    id:string;
    password:string;
}
export interface LoginResponse{
    message:string;
    token:string;
    user:User;
}