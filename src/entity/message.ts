import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./user"

@Entity("ZMESSAGE")
export class Message {
  @PrimaryGeneratedColumn({ name: "Z_PK" })
    id!: number

  @ManyToOne(type => User)
  @JoinColumn({ name: "ZSENDER", referencedColumnName: "id" })
    sender?: User

  @Column({ name: "ZTEXT" })
    text?: string
}
