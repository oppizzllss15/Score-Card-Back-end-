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
  _id?: string;
  image?: string;
  stack: string;
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  phone: string,
  profile_img?: string,
  cloudinary_id?: string,
  squad: number,
  grades: Grades[],
  status: string,
    
}

interface Grades {
      week: number,
      agile: number,
      weekly_task: number,
      assessment: number,
      algorithm: number,
      cummulative: number,
    }