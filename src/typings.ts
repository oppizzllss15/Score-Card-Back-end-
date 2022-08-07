
export type IAdmin = {
  _id?: string,
  firstname: string,
  lastname: string,
  email: string,
  password?: string,
  profilepicture?: string,
  stack: string,
  role: string,
  squad: number,
  activationStatus?: boolean
}
export type IStack = {
  _id?: string,
  name: string
}