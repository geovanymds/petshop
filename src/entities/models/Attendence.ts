import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./";
import { IAttendence } from "./interfaces";

@Entity("attendences")
export class Attendence implements IAttendence{

    @PrimaryGeneratedColumn({type: "int"})
    attendence_id!: number;

    @Column({type: "varchar", length:45})
    animal!: string;

    @Column({type: "varchar", length:45})
    animal_name!: string;

    @Column({type: "date"})
    date!: Date;

    @Column({type: "text"})
    comment!: string;

    @ManyToOne(() => User, user => user.attendences)
    user!: User;

    constructor(animal: string, animal_name: string, date: Date, comment: string) {
        this.animal = animal;
        this.animal_name = animal_name;
        this.date = date;
        this.comment = comment;
    }

}
