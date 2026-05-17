import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";



@Entity("forces")
export class Force {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "integer", nullable: true })
  parent_id!: number | null;

  @ManyToOne(() => Force, (force: Force) => force.children, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  parent!: Force | null;

  @OneToMany(() => Force, (force: any) => force.parent)
  children!: Force[];

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "text" })
  force_type !: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}