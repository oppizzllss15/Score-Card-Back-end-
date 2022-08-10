interface IAdmin {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  phonenumber: string;
  profile_img?: string;
  stack: string[];
  phone?: string;
  role?: string;
  squad?: number;
  activationStatus?: boolean;
}
interface IUser {
  _id: string;
  image: string;
  stack: string;
}
