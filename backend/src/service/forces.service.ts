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

  async searchForces(query: string) {
   if(!query || typeof query !=="string"){
    return [];
   }
   try {
      const queryBuilder = AppDataSource.getRepository(Force).createQueryBuilder("forces");
      type ForceUpgrade = Force & {path_string: string};
      const searchParam = `%${query}%`;

      const rawResults = await queryBuilder.connection.manager.query(`
        WITH RECURSIVE Ancestry AS (
          SELECT id, name, force_type, parent_id, CAST(name AS TEXT) as path_string
          FROM force
          WHERE is_deleted = false 
            AND (name ILIKE :search OR force_type ILIKE :search)
          UNION ALL
          SELECT f.id, f.name, f.force_type, f.parent_id, CAST(f.name || ' -> ' || a.path_string AS TEXT)
          FROM force f
          INNER JOIN Ancestry a ON f.id = a.parent_id
          WHERE f.is_deleted = false
        )
        SELECT id, name, force_type, parent_id, path_string 
        FROM Ancestry
        WHERE name ILIKE :search OR force_type ILIKE :search;
      `, [searchParam]);
      return rawResults.map((row: ForceUpgrade) => ({
        id: row.id,
        name: row.name,
        forceType: row.force_type,
        parentId: row.parent_id,
        path: row.path_string.split(" -> ")
      }));

    } catch (error) {
      console.error("Error inside searchForces execution:", error);
      throw error;
    }

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