import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {User} from "./User";

@Entity()
export class Layout{
    @PrimaryGeneratedColumn()
    id:number
    @Column('text')
    name:string
    @Column('number')
    duration:number
    @Column("simple-json")
    layout_data: {/* TODO : creation date, modified date, path, filename */}
    @ManyToOne(()=>User,(user)=> user.layouts)
    user:User
}