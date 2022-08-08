
export type IAdmin = {
  _id?: string,
  firstname?: string,
  lastname?: string,
  email: string,
  password?: string,
  profilepicture?: string,
  stack?: string,
  phone?: string,
  role?: string,
  squad?: number,
  activationStatus?: boolean
}
export type IStack = {
  _id?: string,
  name: string
}