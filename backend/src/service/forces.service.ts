import { IsNull } from "typeorm";
import { Force } from "../database/force.entity.js";
import { AppDataSource } from "../database/db.js";

const forceRepository = AppDataSource.getRepository(Force);

export const ForcesService = {
  async getAllActiveForces() {
    return await forceRepository.find({
      where: { is_deleted: false },
      relations: ["parent", "children"], 
      order: { id: "ASC" }
    });
  },
  async getForceById(id: string | null) {
      return await forceRepository.findOneBy({ id: Number(id), is_deleted:false });
  },
  async getForcesByParent(parentId: string | null) {
    return await forceRepository.find({
      where: {
        is_deleted: false,
        parent_id: parentId === null ? IsNull() : Number(parentId)
      },
      select: ["id", "name", "force_type", "parent_id"], 
      order: { name: "ASC" }
    });
  },
  async updateForce(id: string , name: string, forceType: string, parentId: number | null) {
    const force = await forceRepository.findOneBy({ id: Number(id) });
    if (!force) return null;

    force.name = name;
    force.force_type = forceType;
    force.parent_id = parentId;

    return await forceRepository.save(force);
  },

  async softDeleteForce(id: string) {
    const force = await forceRepository.findOneBy({ id: Number(id) });
    if (!force) return false;

    force.is_deleted = true;
    await forceRepository.save(force);
    return true;
  }
};