export interface RegisterFormType{
    name:string;
    username:string;
    password:string;
    password_confirm: string;
    email:string;
    phone:number;
    birthdate:string;
}

export interface User{
    name:string;
    username:string;
    password:string;
    email:string;
    phone:number;
    birthdate:string;
}

export interface LoginFormType{
    username:string;
    password:string;
}
export interface LoginResponse{
    message:string;
    data: {
        token:string;
        user:User;
    }
}