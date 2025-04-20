export interface ILoginForm {
    email: string, 
    password: string,
    remember: boolean
}

export interface ILoginRes{
    access_token: string
    user: {
      user_id: string
      email: string
      username: string
      role: string
      avatar: string
      number_phone: string
    }
}

export interface IRegisterForm {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export interface IRegisterRes {
    user_id: string
}

export type IGetAccountRes = ILoginRes['user'];