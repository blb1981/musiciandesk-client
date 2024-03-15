export interface Credentials {
  email: string
  password: string
  remember: boolean
}

export interface RegisterInfo {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface User {
  created_at?: Date
  email?: string
  email_verified_at?: Date
  id?: number
  name?: string
  updated_at?: Date
}
