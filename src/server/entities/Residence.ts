import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Machine } from "./Machine";

@Entity()
export class Residence {
  @PrimaryColumn({ length: 10 })
  code: string;

  
  @OneToMany(type => Machine, machine => machine.residence)
  machines: Machine[];
}
