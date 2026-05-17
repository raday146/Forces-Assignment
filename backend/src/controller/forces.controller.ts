import type { Request, Response } from "express";
import  { ForcesService } from "../service/forces.service.js";

export const ForcesController = {

  
  async updateForce(req: Request, res: Response) {
    const id = req.params.id as string;
   if (typeof id !== 'string') {
      res.status(400).json({ error: "Invalid force ID" });
    }
    const { name, force_type, parent_id } = req.body;
    try {

      const updated = await ForcesService.updateForce(id , name, force_type, parent_id);
      if (!updated) {
        return res.status(404).json({ error: "Force unit not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error in updateForce:", error);
      res.status(500).json({ error: "Failed to update force unit" });
    }
  },
    async getForceById(req: Request, res: Response) {
    try {
    const id = req.params.id;
      
      const searchId = typeof id === "string" ? id : null;

      const force = await ForcesService.getForceById(searchId);
      res.json(force);
    } catch (error) {
      console.error("Error in getForces:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getForces(req: Request, res: Response) {
    try {
      const { parentId } = req.query;
      
      const searchParentId = typeof parentId === "string" ? parentId : null;

      const forces = await ForcesService.getForcesByParent(searchParentId);
      res.json(forces);
    } catch (error) {
      console.error("Error in getForces:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteForce(req: Request, res: Response) {
    const id = req.params.id as string;    
    if (typeof id !== 'string') {
      res.status(400).json({ error: "Invalid force ID" });
    }
    try {
      const success = await ForcesService.softDeleteForce(id);
      if (!success) {
        return res.status(404).json({ error: "Force unit not found" });
      }
      res.json({ message: "Force unit deleted successfully (soft delete)" });
    } catch (error) {
      console.error("Error in deleteForce:", error);
      res.status(500).json({ error: "Failed to delete force unit" });
    }
  }
};