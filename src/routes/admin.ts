import { Router } from "express";
import { activateAdmin, createAdmin, deactivateAdmin, deleteAdmin, updateAdmin} from "../controllers/adminController";

const adminRouter = Router();

adminRouter.post("/create", createAdmin);
adminRouter.put("/update/:adminId", updateAdmin);
adminRouter.delete("/delete", deleteAdmin);
adminRouter.put("/deactivate/:adminId/", deactivateAdmin);
adminRouter.put("/activate/:adminId/", activateAdmin);

module.exports = adminRouter;