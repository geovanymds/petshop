import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Attendence } from "./index";
import { IUser } from "./interfaces";

@Entity('users')
export class User implements IUser{

    @PrimaryGeneratedColumn({type: "int"})
    user_id!: number;

    @Column({type: "varchar", length:45})
    name!: string;

    @Column({type: "varchar", length:45})
    email!: string;

    @Column({type: "varchar", length:120})
    password!: string;

    @OneToMany(() => Attendence, attendence => attendence.user)
    attendences!: Attendence[];

    constructor(name: string, email: string, password:string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}