"use strict";
// import { Admin } from "../models";
// import { IAdmin } from "../typings";
// interface OutputObject<T, U> {
//   result: T;
//   error: U;
// }
// const dummyIAdmin: IAdmin = {
//   _id: "",
//   firstname: "",
//   lastname: "",
//   password: "",
//   email: "",
//   stack: "",
//   role: "",
//   squad: 0,
// };
// export async function createIAdmin(
//   admin: IAdmin
// ): Promise<OutputObject<IAdmin, unknown>> {
//   let outputObject: OutputObject<IAdmin, unknown> = { result: admin, error: null };
//   const adminObject = new Admin(admin);
//   return adminObject
//     .save()
//     .then((savedIAdmin: IAdmin) => {
//       outputObject.result = savedIAdmin ? savedIAdmin : admin;
//       return outputObject;
//     })
//     .catch((err: Error) => {
//       outputObject.error = err;
//       outputObject.error = err;
//       outputObject.result = admin;
//       handleError(err);
//       return outputObject;
//     });
// }
// export function getAdmin(): Promise<OutputObject<IAdmin[], unknown>> {
//   let admins: IAdmin[] = [];
//   let outputObject: OutputObject<IAdmin[], unknown> = {
//     result: admins,
//     error: null,
//   };
//   return Admin.find()
//     .then((fetchedAdmin: IAdmin[]) => {
//       outputObject.result = fetchedAdmin;
//       return outputObject;
//     })
//     .catch((err: Error) => {
//       outputObject.error = err;
//       handleError(err);
//       return outputObject;
//     });
// }
// export async function isIAdminInDatabase(
//   adminName: string,
//   password: string
// ): Promise<OutputObject<IAdmin, unknown>> {
//   let outputObject: OutputObject<IAdmin, unknown> = {
//     result: dummyIAdmin,
//     error: null,
//   };
//   return Admin.find({ adminname: adminName })
//     .then((fetchedIAdmin: IAdmin[]) => {
//       outputObject.result = fetchedIAdmin.length > 0 ? fetchedIAdmin[0] : dummyIAdmin;
//       outputObject.error = fetchedIAdmin ? null : "Not in database";
//       return outputObject;
//     })
//     .catch((err: Error) => {
//       outputObject.error = err.message;
//       handleError(err);
//       return outputObject;
//     });
// }
// export function getIAdminByProperty<T>(
//   property: string,
//   value: string | number
// ): Promise<OutputObject<IAdmin, unknown>> {
//   let outputObject: OutputObject<IAdmin, unknown> = {
//     result: dummyIAdmin,
//     error: null,
//   };
//   const adminProperty: any = {};
//   adminProperty[property] = value;
//   return Admin.find()
//     .then((data: IAdmin[]) => {
//       outputObject.result = data[0];
//       outputObject.error = outputObject.result
//         ? null
//         : "IAdmin not Registered in database";
//       return outputObject;
//     })
//     .catch((err: Error) => {
//       outputObject.error = err.message;
//       handleError(err);
//       return outputObject;
//     });
// }
// export function getIAdminById<T>(
//   id: string
// ): Promise<OutputObject<IAdmin, unknown>> {
//   let outputObject: OutputObject<IAdmin, unknown> = {
//     result: dummyIAdmin,
//     error: null,
//   };
//   return Admin.findById(id)
//     .then((data: IAdmin) => {
//       if (!data) {
//         outputObject.error = "No admin found";
//         return outputObject;
//       }
//       outputObject.result = data;
//       return outputObject;
//     })
//     .catch((err: Error) => {
//       outputObject.error = err.message;
//       return outputObject;
//     });
// }
// export async function updateIAdmin<T>(
//   id: string,
//   admin: IAdmin
// ): Promise<OutputObject<IAdmin, unknown>> {
//   let outputObject: OutputObject<IAdmin, unknown> = { result: admin, error: null };
//   console.log("uSER " + JSON.stringify(admin));
//   return Admin.findByIdAndUpdate(id, {
//     $set: {
//         admin
//     },
//   })
//     .then((updatedIAdmin: IAdmin) => {
//       outputObject.result = updatedIAdmin;
//       console.log("updatedadmin " + JSON.stringify(updateIAdmin));
//       return outputObject;
//     })
//     .catch((err: Error) => {
//       outputObject.error = err.message;
//       handleError(err);
//       return outputObject;
//     });
// }
// export async function deleteIAdmin<T>(
//   id: string
// ): Promise<OutputObject<IAdmin[], unknown>> {
//   let outputObject: OutputObject<IAdmin, unknown> = {
//     result: dummyIAdmin,
//     error: null,
//   };
//   return Admin.findByIdAndRemove(id)
//     .then((updatedIAdmin: IAdmin) => {
//       outputObject.result = updatedIAdmin;
//       return outputObject;
//     })
//     .catch((err: Error) => {
//       outputObject.error = err.message;
//       handleError(err);
//       return outputObject;
//     });
// }
// interface Error {
//   type: string;
//   message: string;
// }
// function handleError(error: Error) {
//   console.log(error.message);
// }
