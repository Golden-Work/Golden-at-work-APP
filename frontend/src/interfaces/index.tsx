export interface Major {
  id: number
  name: string
}

export interface SignupBody {
  email: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
  document: string
  major: number
}
