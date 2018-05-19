import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Message } from "./message"

@Entity("ZUSER")
export class User {
  @PrimaryGeneratedColumn({ name: "Z_PK" })
    id!: number

  @Column({ name: "ZNAME" })
    name?: string

  @OneToMany(type => Message, message => message.sender)
    messages?: Message[]
}
