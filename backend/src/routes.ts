import { Router } from "express";
import  { ForcesController } from "./controller/forces.controller.js";

const router = Router();

router.get("/", ForcesController.getForces);
router.get("/:id", ForcesController.getForceById);
router.put("/:id", ForcesController.updateForce);
router.delete("/:id", ForcesController.deleteForce);


export default router;