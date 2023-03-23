import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {User} from "./User";

@Entity()
export class Layout{
    @PrimaryGeneratedColumn()
    id:string
    @Column()
    name:string
    @Column()
    duration:number
    @Column("simple-json")
    layout_data: {/* TODO : creation date, modified date, path, filename */}
    @ManyToOne(()=>User,(user)=> user.layouts)
    user:User
}