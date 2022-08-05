import { Router } from "express";
import { activateAdmin, createAdmin, deactivateAdmin, deleteAdmin, getAdmin, updateAdmin} from "../controllers/adminController";

const adminRouter = Router();

adminRouter.get("/:adminId", getAdmin)
adminRouter.post("/create", createAdmin);
adminRouter.put("/update/:adminId", updateAdmin);
adminRouter.delete("/delete/:adminId", deleteAdmin);
adminRouter.put("/deactivate/:adminId/", deactivateAdmin);
adminRouter.put("/activate/:adminId/", activateAdmin);

module.exports = adminRouter;