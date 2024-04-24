export interface UserLogin{
    email: string;
    password: string;
  }

  export interface UserRegister{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  export interface statusInterface {
    status: boolean
  }
  
  export interface UserData{
    id: number;
    name: string;
    email: string;
  }

  export interface UserResponse{
    data: UserData;
  }
  export interface LoginResponseInterface {
    msg: string;
    data: UserData;
    jwt: string;
  }

  export interface UserLoginCode{
    email: string;
    password: string;
    codigo: string;
  }
  