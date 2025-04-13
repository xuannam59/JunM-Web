export interface ILoginForm {
    email: string, 
    password: string,
    remember: boolean
}

export interface IRegisterForm {
    username: string
    email: string
    password: string
    confirmPassword: string
}