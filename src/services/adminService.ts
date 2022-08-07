import { Admin } from "../models";
import { IAdmin} from '../typings'
//create admin
export async function addAdmin(admin: IAdmin) {
    try{
        const newAdmin =  await new Admin(admin).save()
        return newAdmin ? newAdmin: null;
    }catch(err){
        handleError(err)
    }
}

//edit admin
export async function editAdmin(adminid: string, admin: IAdmin) {
  try {
    const newAdmin = await Admin.findByIdAndUpdate(adminid, {
      $set: {
        ...admin,
      },
    });
    return newAdmin ? newAdmin : null;
  } catch (err) {
    handleError(err);
  }
}

//get admin
export async function getAdminById(adminid: string) {
  try {
    const newAdmin = await Admin.findById(adminid);
    return newAdmin ? newAdmin : null;
  } catch (err) {
    handleError(err);
  }
}

//edit admin activate or deactivated
export async function editAdminStatus(adminid: string, status: boolean) {
  try {
    const newAdmin = await Admin.findByIdAndUpdate(adminid, {
      $set: {
        activationStatus: status,
      },
    });
    return newAdmin ? newAdmin : null;
  } catch (err) {
    handleError(err);
  }
}


//delete admin
export async function removeAdmin(adminid: string) {
  try {
    const deletedAdmin = await Admin.findByIdAndRemove(adminid );
    return deletedAdmin ? deletedAdmin : false;
  } catch (err) {
    handleError(err); return;
  }
}

//delete admin
export async function isPropertyInDatabase<T>(property: string, value: T) {
  try {
    let propertyObject: any;
    propertyObject[property] = value;
    const admin = await Admin.find({ propertyObject });
    return admin.length > 0 ? admin : false;
  } catch (err) {
    handleError(err); return;
  }
}

interface Error {
    type: string,
    message: string
}

function handleError(error: Error){
    console.log(error.message)
}